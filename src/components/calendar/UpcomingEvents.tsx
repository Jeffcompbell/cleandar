import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { format, startOfDay, isAfter, isSameDay, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { ColorType, DayRecord } from '../../types/calendar';

interface UpcomingEventsProps {
  records: Record<string, DayRecord>;
  onComplete: (date: string) => void;
  onPress: (date: string) => void;
  showCompleteButton?: boolean;
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  records,
  onComplete,
  onPress,
  showCompleteButton = true,
}) => {
  // 获取今天的日期
  const today = startOfDay(new Date());

  // 过滤并排序未来的记录
  const upcomingEvents = Object.entries(records)
    .filter(([date]) => {
      const eventDate = startOfDay(parseISO(date));
      return isAfter(eventDate, today) || isSameDay(eventDate, today);
    })
    .sort(([dateA], [dateB]) => parseISO(dateA).getTime() - parseISO(dateB).getTime());

  if (upcomingEvents.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {showCompleteButton ? '暂无待办事项' : '暂无已完成事项'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {upcomingEvents.map(([date, record]) => (
        <TouchableOpacity
          key={date}
          style={[
            styles.eventItem,
            record.completed && styles.completedEventItem
          ]}
          onPress={() => onPress(date)}
        >
          <View style={styles.eventContent}>
            <View style={[
              styles.colorDot,
              { backgroundColor: record.color ? '#000' : '#999' }
            ]} />
            <View style={styles.eventInfo}>
              <Text style={[
                styles.dateText,
                record.completed && styles.completedText
              ]}>
                {format(parseISO(date), 'MM月dd日 EEEE', { locale: zhCN })}
              </Text>
              {record.note ? (
                <Text style={[
                  styles.noteText,
                  record.completed && styles.completedText
                ]} numberOfLines={2}>
                  {record.note}
                </Text>
              ) : (
                <Text style={styles.noNoteText}>点击添加描述</Text>
              )}
              {record.completed && record.completedAt && (
                <Text style={styles.completedAtText}>
                  完成于 {format(parseISO(record.completedAt), 'MM-dd HH:mm')}
                </Text>
              )}
            </View>
          </View>
          {showCompleteButton && (
            <IconButton
              icon={record.completed ? "check-circle" : "circle"}
              size={24}
              iconColor={record.completed ? '#000' : '#ddd'}
              style={styles.completeButton}
              onPress={() => onComplete(date)}
            />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#999',
    fontSize: 15,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  completedEventItem: {
    backgroundColor: '#fafafa',
  },
  eventContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 8,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 7,
  },
  eventInfo: {
    flex: 1,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  noNoteText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  completedText: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  completedAtText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  completeButton: {
    margin: 0,
    width: 40,
    height: 40,
  },
}); 