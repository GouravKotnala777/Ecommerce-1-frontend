import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MiscReducerTypes{
    isHamActive:boolean;
}

const initialState:MiscReducerTypes = {
    isHamActive:false
}

const miscReducer = createSlice({
    initialState,
    name:"miscReducer",
    reducers:{
        setIsHamActive:(state, action:PayloadAction<boolean>) => {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
            console.log(action.payload);
            
            state.isHamActive = action.payload;
        }
    }
});

export default miscReducer;
export const {setIsHamActive} = miscReducer.actions;