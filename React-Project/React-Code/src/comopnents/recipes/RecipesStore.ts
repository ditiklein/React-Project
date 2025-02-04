import { configureStore } from "@reduxjs/toolkit";
import  recipesReducer from  "./recipesSlice" 
const store=configureStore({
   reducer:{
    recipes:recipesReducer,
   },
});
export type Rootstore=ReturnType<typeof store.getState>
export type AppDispach=typeof store.dispatch
export default store