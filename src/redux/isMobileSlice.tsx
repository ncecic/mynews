
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IsMobileState {
  isMobile: boolean;
}

const initialState: IsMobileState = {
  isMobile: false,
};

export const isMobileSlice = createSlice({
  name: 'isMobile',
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setIsMobile } = isMobileSlice.actions;

export default isMobileSlice.reducer;