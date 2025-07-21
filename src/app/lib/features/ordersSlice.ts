import { Order } from '@/app/entities/order';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await fetch("/api/orders");
  return response.json();
});

interface ordersState {
  orders: Order[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  loading: boolean
}

const initialState: ordersState = { orders: [], status: 'idle', loading: false  };

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<'idle' | 'pending' | 'succeeded' | 'failed'>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'pending'
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.status = 'succeeded'
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
        state.status = 'failed'
      });
  },
});

export const { setStatus } = ordersSlice.actions;
export default ordersSlice.reducer;

