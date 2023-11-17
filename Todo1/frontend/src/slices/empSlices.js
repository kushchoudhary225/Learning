import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const base_url = 'http://localhost:3000/api/v1';
const initialState = {
    BASE_URL : 'http://localhost:3000/api/v1',
    emps : null,
    activeEmp: null
}
export const fetchData = createAsyncThunk('fetchData', async () => {
    try {
      const data = await axios.get(`${base_url}/user/getuser`);
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
        setAllUser : (state, action)=>{
          // console.log('calling from empSlices',   action.payload)
            state.emps = action.payload;
            
        },
        getOnlyActiveUser : (state, action)=>{
          state.activeEmp = state.emps?.filter(ele => ele.status)
        }
    },
    
//     extraReducers : (builder) => {
//         builder.addCase(fetchData.pending, async (state, action) => {
//         })
//         .addCase(fetchData.fulfilled,   async(state, action) => {
//             console.dir('here is payload', action.payload)
//              state.emps = action.payload;
//         }).addCase(fetchData.rejected,  async(state, action) => {
//         })
//     }
})
export const {getOnlyActiveUser, setAllUser, BASE_URL } = empSlice.actions;
export default empSlice.reducer; 