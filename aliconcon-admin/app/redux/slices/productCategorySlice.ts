import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';

const initialState = {
  editingProductCategory: null,
  categoryOptions: [],
};

export const ProductCategorySlice = createSlice({
  name: 'ProductCategory',
  initialState,
  reducers: {
    editProductCategory: (state, { payload }) => {
      state.editingProductCategory = payload;
    },
    insertCategoryOptions: (state, { payload }) => {
      state.categoryOptions = payload;
    },
  },
});

export const editingProductCategory = (state: AppState) => state.ProductCategory.editingProductCategory;
export const categoryOptions = (state: AppState) => state.ProductCategory.categoryOptions;

export const { editProductCategory, insertCategoryOptions } = ProductCategorySlice.actions;

export default ProductCategorySlice.reducer;
