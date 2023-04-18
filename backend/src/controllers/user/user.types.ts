export interface Register_userData {
    username: string;
    email: string;
    password: string;
}

export interface Login_userData {
    email: string;
    password: string;
}

export interface RefreshToken_Body {
    refreshToken: string;
}
