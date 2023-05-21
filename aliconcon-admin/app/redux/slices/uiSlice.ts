import { createSlice } from '@reduxjs/toolkit';
import AddOptionModalTypeEnum from '../../../interfaces/enums/AddOptionModalTypeEnum';
import { AppState } from '../store';

const initialState = {
  addOptionModalIsVisible: false,
  addOptionModalType: AddOptionModalTypeEnum.PRODUCT_CATEGORY,
};

export const userSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleAddOptionModal: (state, { payload }) => {
      state.addOptionModalIsVisible = payload;
    },
    changeTypeAddOptionModal: (state, { payload }) => {
      state.addOptionModalType = payload;
    },
  },
});
export const addOptionModalIsVisible = (state: AppState) => state.ui.addOptionModalIsVisible;
export const addOptionModalType = (state: AppState) => state.ui.addOptionModalType;

export const { toggleAddOptionModal, changeTypeAddOptionModal   } = userSlice.actions;

export default userSlice.reducer;
