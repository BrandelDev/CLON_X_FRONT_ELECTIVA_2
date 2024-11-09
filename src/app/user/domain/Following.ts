export interface Followings {
    followings?: Following[];
}

export interface Following {
    username:  string;
    userId:    string;
    avatarURL: string;
}
