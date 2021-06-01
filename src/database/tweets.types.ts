import { UserDetail } from "./userDetails.types"

export type Tweet = {
    _id: string;
    userId: UserDetail;
    text: string;
    image: string;
    likes: Likes[];
    replies: Replies[];
}

export type Likes = {
    userId: UserDetail;
}

export type Replies = {
    tweetId: Tweet
}