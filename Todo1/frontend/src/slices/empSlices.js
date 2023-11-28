import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const base_url = 'http://localhost:3000/api/v1';
const initialState = {
    BASE_URL : 'http://localhost:3000/api/v1',
    emps : null,
    activeEmp: null,
    authUser : null,
    isLogin: true,
    isAdmin : true,
    showModal : false,
    message : ''
     
}
export const fetchData = createAsyncThunk('fetchData', async () => {
    try {
      const data = await axios.get(`${base_url}/user/getuser`);
      return data.data;
    } catch (error) {
      console.error("Error fetching employee details:", error);
      throw error; 
    }
  });


const empSlice = createSlice({
    name : 'employees details',
    initialState,
    reducers: {
        setAllUser : (state, action)=>{
            state.emps = action.payload;
        },
        getOnlyActiveUser : (state, action)=>{
          state.activeEmp = state.emps?.filter(ele => ele.status)
        },
        setAuthUser : (state, action) => {
          state.authUser = action.payload;
        },
        setIsLogin : (state, action) => {
          state.isLogin = action.payload? true : false ;
        },
        setIsAdmin: (state, action) => {
          state.isAdmin = action.payload? true : false ;
        },
        setShowModal: (state, action) => {
          state.showModal = !state.showModal;
          state.message = action.payload;
        },
        destroyAllState : (state, action) => {
          state.emps = null;
          state.activeEmp= null;
          state.authUser = null;
          state.isAdmin = false;
          state.isLogin = false;

        }
    },
    
    extraReducers : (builder) => {
        builder.addCase(fetchData.pending, async (state, action) => {
          console.log("pending")
        })
        .addCase(fetchData.fulfilled,   async(state, action) => {
            console.dir('fullfilled', action.payload)
             state.emps = action.payload;
        }).addCase(fetchData.rejected,  async(state, action) => {
          console.log("rejected")
        })
    }
})
export const {getOnlyActiveUser, setAllUser, BASE_URL, setAuthUser, setIsLogin, setIsAdmin, destroyAllState, setShowModal} = empSlice.actions;
export default empSlice.reducer; 