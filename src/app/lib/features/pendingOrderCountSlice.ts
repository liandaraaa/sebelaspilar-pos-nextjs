import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setOrderCount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setOrderCount } = counterSlice.actions;
export default counterSlice.reducer;

