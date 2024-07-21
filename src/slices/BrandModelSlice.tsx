import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BrandModel } from "../models/BrandModelModels";

interface BrandModelSliceState {
  data: BrandModel[];
  loading: boolean;
  error: string | null;
}

const initialState: BrandModelSliceState = {
  data: [],
  loading: false,
  error: null,
};

// Define the asynchronous thunk
export const fetchBrandsAndModels = createAsyncThunk(
  "brandModel/fetchBrandsAndModels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<BrandModel[]>(
        "http://localhost:8084/search/brands?item_type=car"
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("test error"); //error.message);
    }
  }
);

const brandModelSlice = createSlice({
  name: "brandModel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandsAndModels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandsAndModels.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchBrandsAndModels.rejected, (state, action) => {
        state.loading = false;
        state.error = "An error occurred"; //action.er
      });
  },
});
export const {} = brandModelSlice.actions;
export default brandModelSlice.reducer;
