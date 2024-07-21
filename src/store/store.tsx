import { configureStore } from '@reduxjs/toolkit';
import brandModelSlice from '../slices/BrandModelSlice';
import filterItemSlice from '../slices/FilterItemSlice';
import filterFormDataSlice from "../slices/FilterFormDataSlice"
import  fetchItemCountSlice from '../slices/FetchItemCountSlice';

const store = configureStore({
  reducer: {
    brandModel: brandModelSlice,
    filterFormData : filterFormDataSlice,
    filterItem: filterItemSlice,
    fetchItemCount: fetchItemCountSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


