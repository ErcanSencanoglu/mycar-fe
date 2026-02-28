import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { Item } from "../models/ItemModels";
import { error } from "console";
import { features } from "process";
import { FilterFormData } from "../models/FilterModel";
import { act } from "react";
import { classToPlain, instanceToPlain } from "class-transformer";
import 'reflect-metadata';

export interface FilterItemSliceState {
  data: Item[];
  loading: boolean;
  error: string | null;
}

const filterItemInitialState: FilterItemSliceState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchItems = createAsyncThunk(
  "filter/fetchItems",
  async (filterFormData: FilterFormData, { rejectWithValue }) => {
    try {

      const response = await axios.post<Item[]>(
        "http://localhost:8084/search/filter",
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

const filterItemSlice = createSlice({
    name: "filterItem",
    initialState: filterItemInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchItems.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchItems.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error= null;
        })
        .addCase(fetchItems.rejected, (state, action) =>{
            state.error = action.error.message ?? null;
            state.loading = false;
        })
    }
});

export const {} = filterItemSlice.actions;
export default filterItemSlice.reducer;


