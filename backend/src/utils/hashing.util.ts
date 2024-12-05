import bcrypt from 'bcrypt';
import { PASSWORD_SALT_ROUND } from '../config/env.config';

export const comparePassword = async function (password: string, encryptedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, encryptedPassword);
};

export const hashPassword = async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, PASSWORD_SALT_ROUND)
}