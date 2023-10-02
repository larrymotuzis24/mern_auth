import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null, 
    loading:false,
    error:false
};

const userSlice = createSlice({
    name:'user', 
    initialState:initialState,
    reducers:{
        signInStart:(state) => {
            state.loading = true;
        }, 
        singInSuccess:(state, action ) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        singInFailure:(state, action ) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart:(state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;

        }
    }
});


export const { signInStart, singInFailure, singInSuccess, updateUserStart, updateUserSuccess, updateUserFailure } = userSlice.actions;

export default userSlice.reducer;