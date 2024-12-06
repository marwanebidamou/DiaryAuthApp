import { z } from 'zod';


export const signupSchema = z.object({
    fullname: z.string().trim().min(1, 'Fullname is required').max(100, 'Fullname shoud be less than 100 characters'),
    email: z
        .string()
        .trim()
        .email("Invalid email address"),
    password: z
        .string()
        .min(10, "Password must be at least 10 characters long"),
    //TODO: image:
});


export const signInSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is required"),
});

// Automatically infer TypeScript types from the schemas
export type SignUpDTO = z.infer<typeof signupSchema>;
export type SignInDTO = z.infer<typeof signInSchema>;

type ConnectedUserResponseDTO = {
    id?: string,
    fullname?: string,
    email?: string,
    pictureUrl?: string
}

export type SignUpResponseDTO = {
    success: boolean,
    status?: SignUpResponseStatus,
    token?: {
        access: string,
        refresh: string,
    },
    user?: ConnectedUserResponseDTO
}


export enum SignUpResponseStatus {
    EmailAlreadyInUse = 'EmailAlreadyInUse',
}

export type SignInResponseDTO = {
    success: boolean,
    token?: {
        access: string,
        refresh: string,
    },
    user?: ConnectedUserResponseDTO
}


export type RefreshTokenDTO = {
    refreshToken: string,
}


export type RefreshTokenResponseDTO = {
    success: boolean,
    token?: {
        access: string,
        refresh: string,
    },
}

export type TokenPayloadDTO = {
    email: string;
    fullname: string;
    id: string;
}