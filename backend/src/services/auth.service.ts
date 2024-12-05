import { Schema } from "zod";
import { SignUpDTO, SignUpResponseDTO, SignUpResponseStatus } from "../dtos/auth.dto";
import { UserModel } from "../models/user.model";
import { hashPassword } from "../utils/hashing.util";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util";



export async function signUp(info: SignUpDTO): Promise<SignUpResponseDTO> {

    if ((await isEmailExists(info.email)).exists) {
        return { success: false, status: SignUpResponseStatus.EmailAlreadyInUse };
    }
    //Todo: handle profile picture upload
    const hashedPassword = await hashPassword(info.password)
    const newUser = await UserModel.create({
        email: info.email,
        fullname: info.fullname,
        password: hashedPassword,
        //TODO: picture_url:'.....'
    });

    //Generate token
    const payload = {
        email: newUser.email!,
        fullname: newUser.fullname!,
        id: newUser._id.toString(),
    };
    const token = {
        access: generateAccessToken(payload),
        refresh: generateRefreshToken(payload)
    };

    return {
        success: true,
        user: {
            email: newUser.email!,
            fullname: newUser.fullname!,
            id: newUser._id.toString(),
            pictureUrl: 'https://placehold.co/400' //TODO: handle profile picture
        },
        token
    }
}

export const isEmailExists = async (email: String): Promise<{ exists: boolean }> => {
    let isExist = await UserModel.exists({ email: email })
    return { exists: !!isExist };
}