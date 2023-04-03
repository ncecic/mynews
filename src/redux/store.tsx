import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './articleSlice';
import isMobileReducer from './isMobileSlice';

export const store = configureStore({
  reducer: {
    article: articleReducer,
    isMobile: isMobileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
