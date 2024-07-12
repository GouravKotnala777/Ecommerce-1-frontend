import { configureStore } from "@reduxjs/toolkit";
import miscReducer from "./reducers/miscReducers";
import api from "./api/api";
import loggedInUserReducer from "./reducers/loggedInUserReducer";


export const store = configureStore({
    reducer:{
        [miscReducer.name]:miscReducer.reducer,
        [loggedInUserReducer.name]:loggedInUserReducer.reducer,
        [api.reducerPath]:api.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});