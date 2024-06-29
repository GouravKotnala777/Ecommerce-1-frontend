import { configureStore } from "@reduxjs/toolkit";
import miscReducer from "./reducers/miscReducers";
import api from "./api/api";


export const store = configureStore({
    reducer:{
        [miscReducer.name]:miscReducer.reducer,
        [api.reducerPath]:api.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});