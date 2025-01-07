import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../constants/colors';
import { ColorType } from '../../types/calendar';

interface DayCellProps {
  date: string;
  color?: ColorType;
  size?: number;
  onPress?: () => void;
  onLongPress?: () => void;
  dayNumber?: number;
}

export const DayCell: React.FC<DayCellProps> = ({
  date,
  color,
  size = 30,
  onPress,
  onLongPress,
  dayNumber,
}) => {
  // 判断日期是否已过
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cellDate = new Date(date);
  cellDate.setHours(0, 0, 0, 0);
  const isPastDate = cellDate < today;

  // 确定样式：
  // 过去的日期：有颜色显示空心圆，无颜色只显示灰色数字
  // 未来的日期：有颜色显示实心圆，无颜色显示灰色填充
  const cellStyle = {
    width: size,
    height: size,
    ...(isPastDate
      ? color
        ? {
            borderWidth: 1.5,
            borderColor: COLORS[color],
            backgroundColor: 'transparent',
          }
        : {
            backgroundColor: 'transparent',
          }
      : {
          backgroundColor: color ? COLORS[color] : '#F5F5F5',
        }),
  };

  // 确定文字颜色：
  // 过去的日期：有颜色用对应颜色，无颜色用灰色
  // 未来的日期：有颜色用白色，无颜色用深灰色
  const textColor = isPastDate
    ? color ? COLORS[color] : '#999999'
    : color ? '#FFFFFF' : '#666666';

  return (
    <TouchableOpacity
      style={[styles.cell, cellStyle]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {dayNumber && (
        <Text
          style={[
            styles.dayText,
            {
              fontSize: size * 0.4,
              color: textColor,
            },
          ]}
        >
          {dayNumber}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderRadius: 999,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontWeight: '500',
  },
}); 