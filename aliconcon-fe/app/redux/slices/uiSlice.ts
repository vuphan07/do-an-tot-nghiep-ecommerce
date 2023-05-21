import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';

const initialState = {
  isOpenPopupAuth: false,
};

export const userSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    togglePopupAuth: (state, { payload }) => {
      state.isOpenPopupAuth = payload;
    },
  },
});
export const isOpenPopupAuth = (state: AppState) => state.ui.isOpenPopupAuth;

export const { togglePopupAuth } = userSlice.actions;

export default userSlice.reducer;
