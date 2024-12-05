import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_REFRESH_EXPIRATION, JWT_SECRET } from '../config/env.config';

export const generateAccessToken = (
    payload: object,
    options?: SignOptions
): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
        ...options,
    });
};


export const generateRefreshToken = (
    payload: object,
    options?: SignOptions
): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRATION,
        ...options,
    });
};

export const verifyToken = (token: string): JwtPayload | string => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

