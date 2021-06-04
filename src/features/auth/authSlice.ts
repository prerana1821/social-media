import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { NavigateFunction } from "react-router";
import { RootState } from "../../app/store";
import { UserCredentials } from "./userCredentials.types";
import { AuthState, Status } from "./auth.types";

export const setupAuthHeaderForServiceCalls = (
    token: string
): string | undefined => {
    console.log(token);
    if (token) {
        console.log('works');
        return (axios.defaults.headers.common["Authorization"] = token);
    }
    delete axios.defaults.headers.common["Authorization"];
};

export const localStorageHasItem = (key: string): string | null => {
    const savedToken = localStorage.getItem(key);
    const { token } = savedToken !== null ? JSON.parse(savedToken) : { token: null };
    return token;
};

let savedToken = localStorageHasItem("token");
if (savedToken) {
    setupAuthHeaderForServiceCalls(savedToken);
}

export const initialAuthState: AuthState = {
    token: savedToken,
    user: null,
    status: {} as Status
}

export type SignInParameters = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    birthDate: string;
}

export type SignInResponse = { user: UserCredentials, token: string };

export const signin = createAsyncThunk("auth/signin", async ({
    firstName, lastName, username, password, email, birthDate,
}: SignInParameters) => {
    const response = await axios.post<SignInResponse>(
        "https://api-socialelite.prerananawar1.repl.co/auth/signup", {
        firstName, lastName, username, password, email, birthDate,
    }
    );
    return response.data;
});

export type LoginParameters = {
    username: string;
    password: string;
}

export type LoginResponse = {
    user: UserCredentials, token: string
}

export const login = createAsyncThunk('auth/login', async ({ username, password }: LoginParameters) => {
    const response = await axios.post<LoginResponse>('https://api-socialelite.prerananawar1.repl.co/auth/login', {
        username, password
    })
    return response.data;
});

export type LogoutParameters = {
    navigate: NavigateFunction,
    dispatch: any,
    userCredentialsDataDeleted: () => void
}

export const logout = ({ navigate, dispatch, userCredentialsDataDeleted }: LogoutParameters): void => {
    dispatch(userCredentialsDataDeleted())
    localStorage?.removeItem("token");
    localStorage?.removeItem("user");
    navigate("/");
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        statusShown: (state, action) => {
            state.status = action.payload
        },
        userCredentialsDataLoaded: (state, action) => {
            state.user = action.payload
        },
        tokenAdded: (state, action) => {
            state.token = action.payload
        },
        userCredentialsDataDeleted: (state) => {
            state = initialAuthState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signin.pending, (state) => {
                state.status.loading = 'loading...';
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                setupAuthHeaderForServiceCalls(action.payload.token);
                localStorage?.setItem("token", JSON.stringify({ token: action.payload.token }));
                localStorage?.setItem("user", JSON.stringify(action.payload.user));
                state.status.success = `SignIn Successfull! ${action.payload.user.firstName}`
            })
            .addCase(signin.rejected, (state, action) => {
                // state.status.error!.errorCode = action.error.code || '403';
                state.status.error!.errorMessage = action.error.message ? action.error.message : 'Something went wrong';
            })
            .addCase(login.pending, (state) => {
                state.status.loading = 'loading...';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                setupAuthHeaderForServiceCalls(action.payload.token);
                localStorage?.setItem("token", JSON.stringify({ token: action.payload.token }));
                localStorage?.setItem("user", JSON.stringify(action.payload.user));
                state.status.success = `Login Successfull! ${action.payload.user.firstName}`
            })
            .addCase(login.rejected, (state, action) => {
                if (state.status.error) {
                    state.status.error.errorCode = action.error.code || '403';
                    state.status.error.errorMessage = action.error.message ? action.error.message : 'Something went wrong'
                }
            });
    },
})

export const { tokenAdded, userCredentialsDataLoaded, statusShown, userCredentialsDataDeleted } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;