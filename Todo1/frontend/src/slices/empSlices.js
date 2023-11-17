import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const BASE_URL = "http://localhost:3000/api/v1"
const initialState = {
    emps : []
}
export const fetchData = createAsyncThunk('fetchData', async () => {
    try {
      const data = await axios.get(`${BASE_URL}/user/getuser`);
      return data.data;
    } catch (error) {
      console.error("Error fetching employee details:", error);
      throw error; // rethrow the error to let the rejection case handle it
    }
  });
  




const empSlice = createSlice({
    name : 'employees details',
    initialState,
    reducers: {
        // ==> normal reducer functions go here
    },
    
    extraReducers : (builder) => {
        builder.addCase(fetchData.pending, async (state, action) => {
            
        })
        .addCase(fetchData.fulfilled,   async(state, action) => {
            console.dir('here is payload', action.payload)
             state.state = ['kush','kumar','choudhary']

        }).addCase(fetchData.rejected,  async(state, action) => {
           

        })
    }
})
export const {} = empSlice.actions;
export default empSlice.reducer; 