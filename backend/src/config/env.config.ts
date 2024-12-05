import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI || '';
export const PASSWORD_SALT_ROUND = Number(process.env.PASSWORD_SALT_ROUND) || 10;