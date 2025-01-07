import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, TextInput as RNTextInput, Alert } from 'react-native';
import { Modal, Portal, Text, Button, IconButton } from 'react-native-paper';
import { format } from 'date-fns';
import { Lunar } from 'lunar-typescript';
import { ColorPicker } from '../common/ColorPicker';
import { ColorType, DayRecord } from '../../types/calendar';

interface DayEditModalProps {
  visible: boolean;
  onDismiss: () => void;
  date: string;
  record?: DayRecord;
  onSave: (record: DayRecord) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MODAL_WIDTH = Math.min(SCREEN_WIDTH - 48, 400);

export const DayEditModal: React.FC<DayEditModalProps> = ({
  visible,
  onDismiss,
  date,
  record,
  onSave,
}) => {
  const [color, setColor] = useState<ColorType | string | undefined>(record?.color);
  const [note, setNote] = useState(record?.note || '');
  const [inputValue, setInputValue] = useState(record?.note || '');

  // 转换农历日期
  const solarDate = new Date(date);
  const lunar = Lunar.fromDate(solarDate);
  const lunarText = `农历 ${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;

  const handleSave = () => {
    if (!color) {
      Alert.alert('提示', '请选择一个颜色');
      return;
    }
    
    const newRecord: DayRecord = {
      date,
      color: color as ColorType,
      note: inputValue.trim(),
    };
    
    console.log('Saving record in modal:', {
      date,
      color,
      note: inputValue.trim(),
    });
    onSave(newRecord);
    onDismiss();
  };

  const handleTextChange = useCallback((text: string) => {
    setInputValue(text);
    // 使用延迟来等待输入法完成
    setTimeout(() => {
      setNote(text);
    }, 100);
  }, []);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        {/* 关闭按钮 */}
        <IconButton
          icon="close"
          size={20}
          onPress={onDismiss}
          style={styles.closeButton}
        />

        {/* 日期头部 */}
        <View style={styles.dateHeader}>
          <Text variant="displaySmall" style={styles.solarDate}>
            {format(solarDate, 'MM.dd')}
          </Text>
          <Text variant="titleMedium" style={styles.solarYear}>
            {format(solarDate, 'yyyy')}
          </Text>
          <Text variant="bodyMedium" style={styles.lunarDate}>
            {lunarText}
          </Text>
        </View>

        {/* 内容区域 */}
        <View style={styles.content}>
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.label}>标记</Text>
            <ColorPicker
              selectedColor={color}
              onSelectColor={setColor}
              size={28}
            />
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.label}>备注</Text>
            <RNTextInput
              value={inputValue}
              onChangeText={handleTextChange}
              placeholder="记录些什么..."
              multiline
              numberOfLines={4}
              style={styles.noteInput}
              textAlignVertical="top"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="default"
              enablesReturnKeyAutomatically={false}
              blurOnSubmit={false}
            />
          </View>
        </View>

        {/* 底部按钮 */}
        <View style={styles.actions}>
          <Button 
            mode="outlined" 
            onPress={onDismiss} 
            style={styles.button}
            labelStyle={styles.buttonLabel}
            theme={{
              colors: {
                outline: '#000',
              }
            }}
          >
            取消
          </Button>
          <Button 
            mode="contained" 
            onPress={handleSave} 
            style={[styles.button, styles.saveButton]}
            labelStyle={styles.saveButtonLabel}
            theme={{
              colors: {
                primary: '#000',
              }
            }}
          >
            保存
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: MODAL_WIDTH,
    alignSelf: 'center',
    borderRadius: 16,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 1,
  },
  dateHeader: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  solarDate: {
    fontSize: 40,
    fontWeight: '600',
    color: '#000',
    letterSpacing: 1,
    lineHeight: 48,
  },
  solarYear: {
    color: '#666',
    marginTop: 4,
  },
  lunarDate: {
    color: '#999',
    marginTop: 4,
  },
  content: {
    paddingTop: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    color: '#000',
    marginBottom: 8,
    fontWeight: '600',
  },
  noteInput: {
    backgroundColor: '#fff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  button: {
    minWidth: 88,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 15,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#000',
  },
  saveButtonLabel: {
    fontSize: 15,
    color: '#fff',
  },
}); 