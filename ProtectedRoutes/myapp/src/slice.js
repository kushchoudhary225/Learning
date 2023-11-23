import {createSlice} from '@reduxjs/toolkit'

const slice = createSlice({
    name : 'sometthing',
    initialState: {
        isLogin: false
      },
    reducers : {
        toggleLogin : (state, action) => {
            state.isLogin = !state.isLogin;
        }
    }

}) 

export default slice.reducer;
export const {toggleLogin} = slice.actions;