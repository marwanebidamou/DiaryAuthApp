// DTOs related to authentication
export interface LoginRequestDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    success: boolean;
    token: {
        access: string;
        refresh: string;
    };
    user: ConnectedUser;
}

export interface ConnectedUser {
    id: string;
    fullname: string;
    email: string;
    pictureUrl?: string;
}

export interface RefreshTokenDTO {
    refreshToken: string;
}

export interface RefreshTokenResponseDTO {
    success: boolean;
    token: {
        access: string;
        refresh: string;
    };
}
