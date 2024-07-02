import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MiscReducerTypes{
    isHamActive:boolean;
    isReviewDialogActive:boolean;
}

const initialState:MiscReducerTypes = {
    isHamActive:false,
    isReviewDialogActive:false
}

const miscReducer = createSlice({
    initialState,
    name:"miscReducer",
    reducers:{
        setIsHamActive:(state, action:PayloadAction<boolean>) => {
            state.isHamActive = action.payload;
        },
        setIsReviewDialogActive:(state, action:PayloadAction<boolean>) => {
            state.isReviewDialogActive = action.payload;
        }
    }
});

export default miscReducer;
export const {setIsHamActive, setIsReviewDialogActive} = miscReducer.actions;