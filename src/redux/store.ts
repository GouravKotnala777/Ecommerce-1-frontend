import { configureStore } from "@reduxjs/toolkit";
import miscReducer from "./reducers/miscReducers";
import api from "./api/api";
import loggedInUserReducer from "./reducers/loggedInUserReducer";
import selectedGiftReducer from "./reducers/selectedGiftReducer";


export const store = configureStore({
    reducer:{
        [miscReducer.name]:miscReducer.reducer,
        [loggedInUserReducer.name]:loggedInUserReducer.reducer,
        [selectedGiftReducer.name]:selectedGiftReducer.reducer,
        [api.reducerPath]:api.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});