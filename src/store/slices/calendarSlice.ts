import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarState, DayRecord } from '../../types/calendar';

const initialState: CalendarState = {
  records: {},
  selectedDate: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setDayRecord: (state, action: PayloadAction<DayRecord>) => {
      const { date } = action.payload;
      state.records[date] = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    removeDayRecord: (state, action: PayloadAction<string>) => {
      delete state.records[action.payload];
    },
  },
}); 