import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { DayRecord } from '../../types/calendar';

interface CalendarState {
  records: Record<string, DayRecord>;
}

const initialState: CalendarState = {
  records: {},
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDayRecord: (state, action: PayloadAction<{ date: string; record: DayRecord }>) => {
      const { date, record } = action.payload;
      state.records[date] = record;
    },
    removeDayRecord: (state, action: PayloadAction<string>) => {
      const date = action.payload;
      delete state.records[date];
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const date = action.payload;
      if (state.records[date]) {
        const record = state.records[date];
        record.completed = !record.completed;
        if (record.completed) {
          record.completedAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
        } else {
          delete record.completedAt;
        }
      }
    },
  },
});

export const { setDayRecord, removeDayRecord, toggleTaskCompletion } = calendarSlice.actions;
export default calendarSlice.reducer; 