import {configureStore} from '@reduxjs/toolkit'
import empSlice from '../slices/empSlices'
export const store = configureStore({
    reducer : empSlice,
    
})