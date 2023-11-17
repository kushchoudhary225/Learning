import { configureStore } from "@reduxjs/toolkit";
import todoSlices from "./todoSlices";
export const store = configureStore({
    reducer : todoSlices
})