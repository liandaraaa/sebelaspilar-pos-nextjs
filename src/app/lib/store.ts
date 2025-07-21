import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/pendingOrderCountSlice';
import orderReducer from './features/ordersSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    orders: orderReducer
  },
});

// Tipe untuk state dan dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

