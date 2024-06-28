import { configureStore } from "@reduxjs/toolkit";
import miscReducer from "./reducers/miscReducers";


export const store = configureStore({
    reducer:{
        [miscReducer.name]:miscReducer.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat()
});