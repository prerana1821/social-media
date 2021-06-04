import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router";
import { RootState } from "../../app/store";
import { UserCredentials } from "./userCredentials.types";
import { AuthState, ServerError, Status } from "./auth.types";

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
    /* ASK */
    dispatch: any;
    statusShown: (status: Status) => void;
    userCredentialsDataLoaded: (user: UserCredentials) => void;
    tokenAdded: (token: string) => void;
}

export type SignInResponse = { user: UserCredentials, token: string };

export const signin = createAsyncThunk("auth/signin", async ({
    firstName, lastName, username, password, email, birthDate, dispatch, statusShown, userCredentialsDataLoaded, tokenAdded
}: SignInParameters) => {
    try {
        console.log({ birthDate });
        const response = await axios.post<SignInResponse>(
            "https://api-socialelite.prerananawar1.repl.co/auth/signup", {
            firstName, lastName, username, password, email, birthDate,
        }
        );
        if (response.status === 201) {
            dispatch(userCredentialsDataLoaded(response.data.user))
            dispatch(tokenAdded(response.data.token));
            setupAuthHeaderForServiceCalls(response.data.token);
            localStorage?.setItem("token", JSON.stringify({ token: response.data.token }));
            localStorage?.setItem("user", JSON.stringify(response.data.user));
            dispatch(statusShown({ success: `Login Successfull! ${response.data.user.firstName}` }))
        }
    } catch (error) {
        console.log(error.response);
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response) {
                return dispatch(statusShown({
                    error: {
                        errorMessage: serverError.response.data.errorMessage,
                        errorCode: serverError.response.data.errorCode,
                    },
                }))
            }
        }
        console.log(error.response);
        return dispatch(statusShown({
            error: {
                errorMessage: "Something went wrong, Try Again!!",
                errorCode: 403,
            },
        }))
    }
});

export type LoginParameters = {
    username: string;
    password: string;
    dispatch: any;
    statusShown: (status: Status) => void;
    tokenAdded: (token: string) => void;
    userCredentialsDataLoaded: (user: UserCredentials) => void;
}

export type LoginResponse = {
    user: UserCredentials, token: string
}

export const login = createAsyncThunk('auth/login', async ({ username, password, dispatch, statusShown, tokenAdded, userCredentialsDataLoaded }: LoginParameters) => {
    try {
        const response = await axios.post<LoginResponse>('https://api-socialelite.prerananawar1.repl.co/auth/login', {
            username, password
        })
        console.log({ response });
        if (response.status === 200) {
            dispatch(userCredentialsDataLoaded(response.data.user))
            dispatch(tokenAdded(response.data.token));
            setupAuthHeaderForServiceCalls(response.data.token);
            localStorage?.setItem("token", JSON.stringify({ token: response.data.token }));
            localStorage?.setItem("user", JSON.stringify(response.data.user));
            dispatch(statusShown({ success: `Login Successfull! ${response.data.user.firstName}` }))
        }
    } catch (error) {
        console.log(error.response);
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response) {
                return dispatch(statusShown({
                    error: {
                        errorMessage: serverError.response.data.errorMessage,
                        errorCode: serverError.response.data.errorCode,
                    },
                }))
            }
        }
        console.log(error.response);
        return dispatch(statusShown({
            error: {
                errorMessage: "Something went wrong, Try Again!!",
                errorCode: 403,
            },
        }))
    }
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
                state.status.loading = 'loading';
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.status.loading = 'fulfilled';
                // state.posts = action.payload.posts;
                // state.value += action.payload;
            }).addCase(signin.rejected, (state, action) => {
                state.status.error!.errorMessage = action.error.message || 'Something went wrong';
            });
    },
})



export const { tokenAdded, userCredentialsDataLoaded, statusShown, userCredentialsDataDeleted } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;