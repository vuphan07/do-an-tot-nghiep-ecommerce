import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';

const initialState: {
  currentUser: any | null;
  currentUserPermission: any | null;
} = {
  currentUser: null,
  currentUserPermission: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    removeCurrentUser: (state) => {
      state.currentUser = null;
      state.currentUserPermission = null;
    },
    setCurrentUserPermission: (state, { payload }) => {
      state.currentUserPermission = payload;
    },
  },
});

export const currentUser = (state: AppState) => state.user.currentUser;
export const currentUserPermission = (state: AppState) => state.user.currentUserPermission;

export const { setCurrentUser, removeCurrentUser, setCurrentUserPermission } = userSlice.actions;

export default userSlice.reducer;
