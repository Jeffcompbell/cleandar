import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, useWindowDimensions, StatusBar } from 'react-native';
import { Text, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format, eachDayOfInterval, startOfYear, endOfYear, getDate, getMonth } from 'date-fns';
import { Lunar } from 'lunar-typescript';
import { DayCell } from '../components/calendar/DayCell';
import { DayEditModal } from '../components/calendar/DayEditModal';
import { RootState } from '../store';
import { setDayRecord } from '../store';
import { ColorType, DayRecord } from '../types/calendar';
import { RootStackScreenProps } from '../navigation/types';

const MONTH_NAMES = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

export const YearScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute<RootStackScreenProps<'Year'>['route']>();
  const records = useSelector((state: RootState) => state.calendar.records);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { width: screenWidth } = useWindowDimensions();

  // 处理路由参数
  useEffect(() => {
    if (route.params?.selectedDate) {
      setSelectedDate(route.params.selectedDate);
    }
  }, [route.params?.selectedDate]);

  // 添加调试日志
  useEffect(() => {
    console.log('=== Records Updated ===');
    console.log('Current Records:', JSON.stringify(records, null, 2));
    console.log('====================');
  }, [records]);

  const currentYear = new Date().getFullYear();
  const today = new Date();
  const lunar = Lunar.fromDate(today);
  const lunarText = `农历 ${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;

  const days = eachDayOfInterval({
    start: startOfYear(new Date(currentYear, 0, 1)),
    end: endOfYear(new Date(currentYear, 11, 31)),
  });

  // 按月份分组数据
  const monthlyDays = Array.from({ length: 12 }, (_, month) => 
    days.filter(day => getMonth(day) === month)
  );

  const handleDayPress = (date: string) => {
    setSelectedDate(date);
  };

  const handleSaveRecord = (record: DayRecord) => {
    console.log('=== Saving Record ===');
    console.log('Current Records:', JSON.stringify(records, null, 2));
    console.log('New Record:', JSON.stringify(record, null, 2));
    console.log('===================');
    dispatch(setDayRecord({ date: record.date, record }));
    setSelectedDate(null);
  };

  // 计算每个圆点的大小，考虑边距和间距
  const SIDE_PADDING = 4;
  const CELL_MARGIN = 2;
  const availableWidth = screenWidth - (SIDE_PADDING * 2);
  const cellSize = Math.min(24, (availableWidth - (CELL_MARGIN * 11)) / 12);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        {/* 标题区域 */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleYear}>{currentYear}年</Text>
          <Text style={styles.titleDate}>
            {format(today, 'MM月dd日')} {lunarText}
          </Text>
        </View>

        {/* 月份标题行 */}
        <View style={styles.header}>
          <View style={styles.monthHeaderContainer}>
            {MONTH_NAMES.map((name, index) => (
              <Text key={index} style={styles.monthHeaderText}>
                {name}
              </Text>
            ))}
          </View>
        </View>

        {/* 日期矩阵 */}
        <View style={styles.content}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {Array.from({ length: 31 }).map((_, dayIndex) => (
              <View key={dayIndex} style={styles.dayRow}>
                <View style={styles.monthRow}>
                  {monthlyDays.map((monthDays, monthIndex) => {
                    const day = monthDays[dayIndex];
                    if (!day) return <View key={monthIndex} style={[styles.emptyCellSpace, { width: cellSize }]} />;
                    
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const record = records[dateStr];
                    return (
                      <DayCell
                        key={monthIndex}
                        date={dateStr}
                        color={record?.color}
                        size={cellSize}
                        onPress={() => handleDayPress(dateStr)}
                        dayNumber={getDate(day)}
                      />
                    );
                  })}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 待办事项按钮 */}
        <FAB
          icon="calendar-check"
          style={styles.fab}
          onPress={() => navigation.navigate('Upcoming')}
          color="#fff"
        />

        {/* 日期编辑弹窗 */}
        {selectedDate && (
          <DayEditModal
            visible={!!selectedDate}
            onDismiss={() => setSelectedDate(null)}
            date={selectedDate}
            record={records[selectedDate]}
            onSave={handleSaveRecord}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 8,
  },
  titleYear: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  titleDate: {
    fontSize: 13,
    color: '#666',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 4,
  },
  monthHeaderContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  monthHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    color: '#000',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 2,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 4,
    height: 26,
  },
  monthRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyCellSpace: {
    height: 24,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#000',
  },
}); 