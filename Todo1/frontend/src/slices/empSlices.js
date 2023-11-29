import { createSlice } from "@reduxjs/toolkit";

import axios from 'axios';
import { fetchData, createUser, deleteUser, updateUser, singleUser, login, logout,fetchOnlyActiveUser } from "../API/collection";

const base_url = 'http://localhost:3000/api/v1';
const initialState = {
    BASE_URL : 'http://localhost:3000/api/v1',
    emps : null,
    activeEmp: null,
    authUser : null,
    isLogin: true,
    isAdmin : true,
    showModal : false,
    message : '',
    updateuser : null
     
}



const empSlice = createSlice({
    name : 'employees details',
    initialState,
    reducers: {
        setAllUser : (state, action)=> {
            state.emps = action.payload;
        },
        getOnlyActiveUser : (state, action)=>{
          // state.activeEmp = state.activeEmp.action.payload.alluser;
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
        builder.addCase(fetchData.pending,  (state, action) => {
          // console.log("pending")
        })
        .addCase(fetchData.fulfilled,   (state, action) => {
            // console.dir('fullfilled', action.payload)
             state.emps = action.payload.alluser;
              // console.log(state.emps)
        }).addCase(fetchData.rejected,  (state, action) => {
          state.message = 'Internal Server error';
          state.showModal = true;
        }).addCase(createUser.pending,  (state, action) => {
            // console.log("pending")
        })
        .addCase(createUser.fulfilled,   (state, action) => {
            // console.log("action.payload", action.payload.msg)
              state.message = action.payload.msg
              state.showModal = true;
              // console.log('fulfilled state');
        }).addCase(createUser.rejected,  (state, action) => {
          state.message = 'Internal Server error';
          state.showModal = true;
        }).addCase(deleteUser.pending, (state, action) => {

        }).addCase(deleteUser.fulfilled, (state, action) => {
          state.message = action.payload.msg;
          state.showModal = true;
        }).addCase(deleteUser.rejected, (state , action) => {
          state.message = 'Internal Server error';
          state.showModal = true;
        }).addCase(fetchOnlyActiveUser.pending, (state, action) => {

        }).addCase(fetchOnlyActiveUser.fulfilled, (state,action) => {
          state.activeEmp = action.payload.alluser;
        }).addCase(fetchOnlyActiveUser.rejected, (state, action) => {
            state.showModal = true;
            state.message = 'Internal Server error'
        }).addCase(singleUser.pending, (state, action) => {

        }).addCase(singleUser.fulfilled, (state, action) => {
          // console.log('calling api ', action.payload.user)
            state.updateuser = action.payload.user;
        }).addCase(singleUser.rejected, (state, action) => {
          state.showModal = true;
          state.message = "Internal Server Error";
        }).addCase(updateUser.pending, (state, action) => {

        }).addCase(updateUser.fulfilled, (state, action) => {
          state.showModal = true;
          state.message = action.payload.msg;

        }).addCase(updateUser.rejected, (state, action) => {
          state.showModal = true;
          state.message = "Internal Server Error..."
        })
    }
})
export const {getOnlyActiveUser, setAllUser, BASE_URL, setAuthUser, setIsLogin, setIsAdmin, destroyAllState, setShowModal} = empSlice.actions;
export default empSlice.reducer; 