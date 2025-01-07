import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import calendarReducer from './slices/calendarSlice';
import { CalendarState } from '../types/calendar';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['records'],
};

const persistedReducer = persistReducer<CalendarState>(persistConfig, calendarReducer);

export const store = configureStore({
  reducer: {
    calendar: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './slices/calendarSlice'; 