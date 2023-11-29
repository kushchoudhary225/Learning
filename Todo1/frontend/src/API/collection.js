import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api/v1'


export const fetchData = createAsyncThunk('collection/fetchdata', async () => {
    try {
      const data = await axios.get(`${BASE_URL}/user/getuser`);
      return data.data;
    } catch (error) {
      console.error("Error fetching employee details:", error);
      return error; 
    }
  });
export const fetchOnlyActiveUser = createAsyncThunk('collection/fetchOnlyActiveUser', async () => {
    try {
      const data = await axios.get(`${BASE_URL}/user/getuserfilter`);
      return data.data;
    } catch (error) {
      console.error("Error fetching employee details:", error);
      return error; 
    }
  });

  
  export const createUser = createAsyncThunk('collection/new', async (value) => {
    try {
      const data = await axios.post(`${BASE_URL}/user/new`, value);
    return data.data;
    } catch (error) {
      console.error("Error fetching employee details:", error);
      return error; 
    }
  });


  export const deleteUser = createAsyncThunk('collection/delete', async ( ids) => {
    try {
      // console.log({ids})
      const data = await axios.post(`${BASE_URL}/user/delete`,ids);
      return data.data;
    } catch (error) {
      console.error("Error fetching employee details:", error);
      return error; 
    }
  });


  export const updateUser = createAsyncThunk('collection/update', async (user) => {
    try {
      const data = await axios.post(`${BASE_URL}/user/update`,user);
      return data.data;
    } catch (error) {
      console.error("Error fetching employee details:", error);
      return error; 
    }
  });


  export const singleUser = createAsyncThunk('collection/singleuser', async ({empid}) => {
    try {
      const data = await axios.post(`${BASE_URL}/user/getone`,{empid});
      return data.data;
    } catch (error) {
      console.error("Error fetching employee details:", error);
      return error; 
    }
  });


  export const login = createAsyncThunk('collection/login', async (value) => {
    try {
      const data = await axios.post(`${BASE_URL}/user/getone`,value);
      return data.data;
    } catch (error) {
      console.error("Error fetching employee details:", error);
      return error; 
    }
  });
  export const logout = createAsyncThunk('collection/singleuser', async (value) => {
    try {
      const data = await axios.post(`${BASE_URL}/user/logout`,value);
      return data.data;
    } catch (error) {
      console.error("Error fetching employee details:", error);
      return error; 
    }
  });