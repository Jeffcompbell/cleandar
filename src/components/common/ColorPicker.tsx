import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { IconButton, Portal, Modal, Text, Button } from 'react-native-paper';
import WheelColorPicker from 'react-native-wheel-color-picker';
import { ColorType } from '../../types/calendar';
import { COLORS } from '../../constants/colors';

interface ColorPickerProps {
  selectedColor?: ColorType | string;
  onSelectColor: (color: ColorType | string) => void;
  size?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MODAL_WIDTH = Math.min(SCREEN_WIDTH - 48, 400);

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onSelectColor,
  size = 30,
}) => {
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [tempColor, setTempColor] = useState('#000000');

  // 计算合适的圆点大小和间距
  const containerWidth = MODAL_WIDTH - 40; // 减去弹窗的内边距
  const totalItems = Object.keys(COLORS).length + 1; // 预设颜色 + 自定义颜色
  const gap = 8; // 固定间距
  const availableWidth = containerWidth - (gap * (totalItems - 1));
  const buttonSize = Math.floor(availableWidth / totalItems);

  const handleCustomColorSelect = () => {
    onSelectColor(tempColor);
    setShowCustomPicker(false);
  };

  return (
    <View style={styles.container}>
      {/* 预设颜色 */}
      {(Object.keys(COLORS) as ColorType[]).map((color) => (
        <TouchableOpacity
          key={color}
          onPress={() => onSelectColor(color)}
          style={[
            styles.colorButton,
            {
              backgroundColor: COLORS[color],
              width: buttonSize,
              height: buttonSize,
              borderWidth: selectedColor === color ? 2 : 0,
            },
          ]}
        />
      ))}

      {/* 自定义颜色按钮 */}
      <View style={[
        styles.colorButton,
        styles.customColorButton,
        {
          width: buttonSize,
          height: buttonSize,
          borderWidth: selectedColor && !Object.keys(COLORS).includes(selectedColor as string) ? 2 : 0,
          backgroundColor: selectedColor && !Object.keys(COLORS).includes(selectedColor as string)
            ? selectedColor
            : '#f5f5f5',
        },
      ]}>
        <TouchableOpacity
          onPress={() => setShowCustomPicker(true)}
          style={styles.customColorTouchable}
        >
          <Text style={[styles.plusIcon, { fontSize: buttonSize * 0.5 }]}>+</Text>
        </TouchableOpacity>
      </View>

      {/* 自定义颜色选择器弹窗 */}
      <Portal>
        <Modal
          visible={showCustomPicker}
          onDismiss={() => setShowCustomPicker(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text variant="titleMedium" style={styles.modalTitle}>
            自定义颜色
          </Text>
          
          <View style={styles.colorPickerContainer}>
            <WheelColorPicker
              color={tempColor}
              onColorChange={setTempColor}
              thumbSize={30}
              sliderSize={20}
              row={false}
            />
          </View>

          <View style={styles.modalActions}>
            <Button 
              mode="outlined" 
              onPress={() => setShowCustomPicker(false)}
              style={styles.modalButton}
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
              onPress={handleCustomColorSelect}
              style={[styles.modalButton, styles.confirmButton]}
              labelStyle={styles.confirmButtonLabel}
              theme={{
                colors: {
                  primary: '#000',
                }
              }}
            >
              确定
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  colorButton: {
    borderRadius: 999,
    borderColor: '#000',
  },
  customColorButton: {
    overflow: 'hidden',
  },
  customColorTouchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    color: '#666',
    fontWeight: '300',
    marginTop: -2,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 16,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
    fontWeight: '600',
  },
  colorPickerContainer: {
    height: 300,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    minWidth: 88,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 15,
    color: '#000',
  },
  confirmButton: {
    backgroundColor: '#000',
  },
  confirmButtonLabel: {
    fontSize: 15,
    color: '#fff',
  },
}); 