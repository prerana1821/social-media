import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { Status } from "../auth/auth.types";
import { InitialUserDetailsState, UserDetail } from "./userDetails.types";

export const loadUserDetails = createAsyncThunk("userDetails/loadUserDetails", async () => {
    const response = await axios.get<{ userDetails: UserDetail }>(
        "https://api-socialelite.prerananawar1.repl.co/user-details",
    );
    console.log(response.data);
    return response.data.userDetails;
});

export type UpdateProfileParams = {
    bio: string,
    location: string,
    url: string,
    backgroundImage: File,
    profileImage: File,
}

export const updateProfile = createAsyncThunk("userDetails/updateProfile", async ({ bio, location, url, backgroundImage, profileImage }: UpdateProfileParams) => {
    const data = new FormData();
    data.append("bio", bio);
    data.append("location", location);
    data.append("url", url);
    data.append("backgroundImage", backgroundImage);
    data.append("profileImage", profileImage);
    console.log(data);
    const response = await axios.post<{ updatedUserDetails: UserDetail }>(
        "https://api-socialelite.prerananawar1.repl.co/user-details", data);
    console.log(response.data);
    return response.data.updatedUserDetails;
})

export const initialUserDetailsState: InitialUserDetailsState = {
    userDetails: null,
    status: {} as Status
}

export const userDetailSlice = createSlice({
    name: "userDetails",
    initialState: initialUserDetailsState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadUserDetails.pending, (state) => {
                state.status.loading = 'loading...';
            })
            .addCase(loadUserDetails.fulfilled, (state, action) => {
                state.status.success = 'fulfilled';
                state.userDetails = action.payload;
            })
            .addCase(loadUserDetails.rejected, (state, action) => {
                if (state.status.error) {
                    state.status.error.errorCode = action.error.code || '403';
                    state.status.error.errorMessage = action.error.message ? action.error.message : 'Something went wrong'
                }
            })
            .addCase(updateProfile.pending, (state) => {
                state.status.loading = 'updating profile...';
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status.success = 'fulfilled';
                state.userDetails = action.payload
            })
            .addCase(updateProfile.rejected, (state, action) => {
                if (state.status.error) {
                    state.status.error.errorCode = action.error.code || '403';
                    state.status.error.errorMessage = action.error.message ? action.error.message : 'Something went wrong'
                }
            })

    },
})


export const selectUserDetails = (state: RootState) => state.useDetails;

export default userDetailSlice.reducer;