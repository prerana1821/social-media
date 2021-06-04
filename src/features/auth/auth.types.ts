import { UserCredentials } from "./userCredentials.types"

export type Status = {
    loading?: string;
    success?: string;
    error?: ServerError;
}

export type AuthState = {
    token: string | null;
    user: UserCredentials | null,
    status: Status,
}

export type ServerError = {
    errorMessage: string;
    errorCode?: string;
}