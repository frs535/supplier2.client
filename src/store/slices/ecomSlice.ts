import { createSlice } from "@reduxjs/toolkit";

export interface EcomState {
    token: string
}
const initialState: EcomState = {
    token: "",
};

export const ecomSlice = createSlice({
    initialState,
    name: "ecom",
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.token = '';
        },
    },
});

export const {
    setLogin,
    setLogout} = ecomSlice.actions;

export default ecomSlice.reducer;