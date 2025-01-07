export type ColorType = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'purple' | 'gray';

export interface DayRecord {
  date: string;  // ISO 格式的日期字符串
  color?: ColorType;
  note?: string;  // 文本备注
}

export interface CalendarState {
  records: Record<string, DayRecord>;  // 键是 ISO 格式的日期字符串
  selectedDate: string | null;
} 