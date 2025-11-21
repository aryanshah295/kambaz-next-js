import { createSlice } from "@reduxjs/toolkit";


type initialS = {
    currentUser: any | null;
}


const initialState: initialS = {
    currentUser: null,
}



const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;