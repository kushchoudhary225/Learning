import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    statemargin : '40px'
}
const navSlices = createSlice({
    name : "margin slices",
    initialState,
    reducers : {
        changeMargin : (state, action) => {
            state.changeMargin = action.payload;
        }
    }    
})

export default navSlices.reducer;
export const {changeMargin} = navSlices.actions;