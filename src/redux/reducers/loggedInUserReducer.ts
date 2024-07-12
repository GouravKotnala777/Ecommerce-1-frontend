import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserTypes } from "../../assets/demoData";


export interface loggedInUserInitialState {
    user:UserTypes|null;
    isLoading:boolean;
    isError:boolean;
}

const initialState:loggedInUserInitialState = {
    user:null,
    isLoading:true,
    isError:false
}

const loggedInUserReducer = createSlice({
    initialState,
    name:"loggedInUserReducer",
    reducers:{
        setLoggedInUser:(state, action:PayloadAction<loggedInUserInitialState>) => {
            state.user = action.payload.user;
            state.isLoading = action.payload.isLoading;
            state.isError = action.payload.isError;
        }
    },
});

export default loggedInUserReducer;
export const {setLoggedInUser} = loggedInUserReducer.actions;