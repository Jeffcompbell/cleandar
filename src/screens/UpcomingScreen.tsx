import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Alert } from 'react-native';
import { IconButton, Text, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { UpcomingEvents } from '../components/calendar/UpcomingEvents';
import { RootState } from '../store';
import { toggleTaskCompletion } from '../store/slices/calendarSlice';

type TabType = 'pending' | 'completed';

export const UpcomingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const records = useSelector((state: RootState) => state.calendar.records);
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleCompleteEvent = (date: string) => {
    dispatch(toggleTaskCompletion(date));
  };

  const filteredRecords = Object.entries(records).reduce((acc, [date, record]) => {
    // 首先检查完成状态
    const matchesTab = (activeTab === 'pending' && !record.completed) || 
                      (activeTab === 'completed' && record.completed);
    
    // 然后检查搜索条件
    const matchesSearch = searchQuery === '' || 
                         record.note?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         date.includes(searchQuery);
    
    if (matchesTab && matchesSearch) {
      acc[date] = record;
    }
    return acc;
  }, {} as Record<string, typeof records[keyof typeof records]>);

  const handleExport = async () => {
    try {
      // 创建CSV内容
      let csvContent = "日期,描述,状态,完成时间,颜色\n";
      
      Object.entries(records).forEach(([date, record]) => {
        const formattedDate = format(new Date(date), 'yyyy-MM-dd');
        const status = record.completed ? '已完成' : '未完成';
        const completedAt = record.completedAt ? 
          format(new Date(record.completedAt), 'yyyy-MM-dd HH:mm:ss') : '';
        
        csvContent += `${formattedDate},"${record.note || ''}",${status},${completedAt},${record.color || ''}\n`;
      });

      // 保存文件
      const fileName = `cleandar_tasks_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`;
      const filePath = `${FileSystem.documentDirectory}${fileName}`;
      
      await FileSystem.writeAsStringAsync(filePath, csvContent, {
        encoding: FileSystem.EncodingType.UTF8
      });

      // 分享文件
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filePath);
      }
    } catch (error) {
      Alert.alert('导出失败', '导出任务列表时发生错误');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {!showSearch ? (
        <View style={styles.header}>
          <IconButton
            icon="chevron-left"
            size={28}
            iconColor="#000"
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.headerTitle}>
            <View style={styles.tabContainer}>
              <Pressable
                style={styles.tab}
                onPress={() => setActiveTab('pending')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'pending' && styles.activeTabText
                  ]}
                >
                  待办事项
                </Text>
                {activeTab === 'pending' && <View style={styles.activeIndicator} />}
              </Pressable>
              <Pressable
                style={styles.tab}
                onPress={() => setActiveTab('completed')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'completed' && styles.activeTabText
                  ]}
                >
                  已完成
                </Text>
                {activeTab === 'completed' && <View style={styles.activeIndicator} />}
              </Pressable>
            </View>
          </View>
          <View style={styles.headerActions}>
            <IconButton
              icon="magnify"
              size={24}
              iconColor="#000"
              style={styles.headerButton}
              onPress={() => setShowSearch(true)}
            />
            <IconButton
              icon="share-variant-outline"
              size={24}
              iconColor="#000"
              style={styles.headerButton}
              onPress={handleExport}
            />
          </View>
        </View>
      ) : (
        <View style={styles.searchHeader}>
          <Searchbar
            placeholder="搜索任务..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            iconColor="#000"
            autoFocus
          />
          <IconButton
            icon="close"
            size={24}
            iconColor="#000"
            style={styles.headerButton}
            onPress={() => {
              setSearchQuery('');
              setShowSearch(false);
            }}
          />
        </View>
      )}

      <UpcomingEvents
        records={filteredRecords}
        onComplete={handleCompleteEvent}
        onPress={(date) => {
          navigation.goBack();
          setTimeout(() => {
            navigation.navigate('Year', { selectedDate: date });
          }, 300);
        }}
        showCompleteButton={activeTab === 'pending'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerButton: {
    margin: 0,
    width: 48,
    height: 48,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingLeft: 16,
    paddingRight: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    elevation: 0,
    borderRadius: 8,
    height: 40,
  },
  searchInput: {
    fontSize: 15,
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  tab: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    position: 'relative',
  },
  tabText: {
    fontSize: 15,
    color: '#999',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: '#000',
  },
}); 