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
    user: ConnectedUserDTO;
}

export interface ConnectedUserDTO {
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

export interface SignUpRequestDTO {
    fullname: string;
    email: string;
    password: string;
    pictureBae64?: string;
}


export type SignUpResponseDTO = {
    success: boolean,
    status?: SignUpResponseStatus,
    token?: {
        access: string,
        refresh: string,
    },
    user?: ConnectedUserDTO
}


export enum SignUpResponseStatus {
    EmailAlreadyInUse = 'EmailAlreadyInUse',
}