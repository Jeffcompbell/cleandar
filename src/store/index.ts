import { configureStore } from '@reduxjs/toolkit';
import { calendarSlice } from './slices/calendarSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 导出 actions
export const { setDayRecord, setSelectedDate, removeDayRecord } = calendarSlice.actions; 