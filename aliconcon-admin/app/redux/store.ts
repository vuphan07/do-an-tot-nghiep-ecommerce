import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import categoryReducer from './slices/productCategorySlice';
import uiReducer from './slices/uiSlice';
const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  ProductCategory: categoryReducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

const store = makeStore();

export default store;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
