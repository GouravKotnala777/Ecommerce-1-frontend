import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CouponTypes } from "../../assets/demoData";

export interface SelectedGiftReducerInitialState {
    isLoading:boolean;
    gift:{
        userID:{name:string; email:string;};
        coupon:CouponTypes;
        status:"pending"|"completed";
    }|null;
    isError:boolean;
}

const selectedGiftReducerInitialState:SelectedGiftReducerInitialState = {
    isLoading:true,
    gift:null,
    isError:false
}

const selectedGiftReducer = createSlice({
    initialState:selectedGiftReducerInitialState,
    name:"selectedGiftReducer",
    reducers:{
        setGiftReducer:(state, action:PayloadAction<SelectedGiftReducerInitialState>) => {
            state.isLoading = action.payload.isLoading;
            state.gift = action.payload.gift;
            state.isError = action.payload.isError;
        }
    }
});

export default selectedGiftReducer;
export const {setGiftReducer} = selectedGiftReducer.actions;