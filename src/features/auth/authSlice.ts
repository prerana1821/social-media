import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UserCredentials } from "../../database/userCredentials.types";

export type Status = {
    loading: string;
    success: string;
    error: string;
}

export type AuthState = {
    token: string | null;
    user: UserCredentials | null,
    status: Status,
}

export const initialAuthState: AuthState = {
    token: null,
    user: null,
    status: {} as Status
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {}
})


export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;