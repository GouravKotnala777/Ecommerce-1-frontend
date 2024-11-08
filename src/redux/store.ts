import { configureStore } from "@reduxjs/toolkit";
import miscReducer from "./reducers/miscReducers";
import loggedInUserReducer from "./reducers/loggedInUserReducer";
import selectedGiftReducer from "./reducers/selectedGiftReducer";


export const store = configureStore({
    reducer:{
        [miscReducer.name]:miscReducer.reducer,
        [loggedInUserReducer.name]:loggedInUserReducer.reducer,
        [selectedGiftReducer.name]:selectedGiftReducer.reducer
    }
});