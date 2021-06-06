import { Status } from "../auth/auth.types"
import { Tweet } from "../tweet/tweets.types"

export type UserDetail = {
    _id: string;
    bio: string;
    url: string;
    birthDate: Date;
    location: string;
    backgroundImage: string;
    profileImage: string;
    followers: UserDetail[];
    following: UserDetail[];
    bookMarks: Tweet[];
    notifications: Notification[];
}

export type Notification = {
    type: string;
    text: string;
}

export type InitialUserDetailsState = {
    userDetails: UserDetail | null,
    status: Status,
}