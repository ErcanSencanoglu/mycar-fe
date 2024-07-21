import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FilterFormData } from "../models/FilterModel";

export interface FetchItemCountSliceState {
    data: Number | null;
    loading: boolean;
    error: String | null;
  }
  
  const fetchItemCountInitialState: FetchItemCountSliceState = {
    data: null,
    loading: false,
    error: null,
  };
  
  export const fetchItemCount = createAsyncThunk(
    "filter/fetchItemCount",
    async (filterFormData: FilterFormData, { rejectWithValue }) => {
      try {
        const response = await axios.post<Number>(
          "http://localhost:8084/search/filter/count",
           filterFormData
        );
        const data = response.data;
        return data;
      } catch (error) {
        console.log(error);
        return rejectWithValue("test error");
      }
    }
  );
  
  const fetchItemCountSlice = createSlice({
    name: "fetchItemCount",
    initialState: fetchItemCountInitialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchItemCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItemCount.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchItemCount.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  
    }
  });
  
  export const {} = fetchItemCountSlice.actions;
  export default fetchItemCountSlice.reducer;