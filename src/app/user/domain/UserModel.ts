export interface UserModel {
    userName: string;
    email: string;
    password: string;
    displayName: string;
    avatarUrl: string;
    bio: string;
    birthdate: Date;
}

export interface LoginModel extends Pick<UserModel, 'email' | 'password'> {}
