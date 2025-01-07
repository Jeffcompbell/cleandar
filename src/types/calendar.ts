export type ColorType = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink';

export interface DayRecord {
  date: string;
  color?: ColorType;
  note?: string;
  completed?: boolean;
  completedAt?: string;
}

export interface CalendarState {
  records: Record<string, DayRecord>;
  _persist?: any; // for redux-persist
} 