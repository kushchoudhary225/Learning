import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    lists : ['kush', 'rahul']
};

const todoSlice = createSlice({
    name : 'todo slice',
    initialState,
    reducers : {
        addToList : (state, action) =>{
            state.lists.push(action.payload);
        },
        deleteFromList : (state, action) =>{
            state.lists = state.lists.filter((ele, i)=> i !== action.payload)
        }
    }
})

export const {addToList, deleteFromList} = todoSlice.actions;
export default todoSlice.reducer; 