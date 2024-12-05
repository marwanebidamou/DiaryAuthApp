import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI || '';
export const PASSWORD_SALT_ROUND = Number(process.env.PASSWORD_SALT_ROUND) || 10;


//JWT CONFIG
// jwt secret
export const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';
// Default access token expiration
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '15m';
// Default refresh token expiration
export const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '7d';