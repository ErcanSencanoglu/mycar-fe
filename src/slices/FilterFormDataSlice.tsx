import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterFormData } from "../models/FilterModel";


export interface FilterFormDataSliceState {
    data: FilterFormData | null
}

const filterFormDataInitialState : FilterFormDataSliceState ={
    data : null
}

const filterFormDataSlice = createSlice({
    name : "filterFormData",
    initialState : filterFormDataInitialState,
    reducers : {
        setFormData(state, action: PayloadAction<FilterFormData>){
            state.data = {...state.data, ...action.payload};
        },
        replaceFormData(state, action: PayloadAction<FilterFormData>){
            state.data = action.payload;
        },
    }
})

export const {setFormData, replaceFormData} = filterFormDataSlice.actions;
export default  filterFormDataSlice.reducer;