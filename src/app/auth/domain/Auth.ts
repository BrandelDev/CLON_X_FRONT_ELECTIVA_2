export interface AuthResponse {
    message: string;
    token:   string;
    user:    User;
}

export interface User {
    id:       string;
    email:    string;
    username: string;
    avatarURL: string;
}
