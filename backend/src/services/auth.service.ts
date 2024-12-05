import { Schema } from "zod";
import { RefreshTokenDTO, RefreshTokenResponseDTO, SignInDTO, SignInResponseDTO, SignUpDTO, SignUpResponseDTO, SignUpResponseStatus, TokenPayloadDTO } from "../dtos/auth.dto";
import { UserModel } from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/hashing.util";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwt.util";



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
    const payload: TokenPayloadDTO = {
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


export async function signIn(info: SignInDTO): Promise<SignInResponseDTO> {
    //Get user from database
    const user = await UserModel.findOne({ email: info.email });
    if (!user) {
        return { success: false }
    }

    //Compare password
    const isMatch = await comparePassword(info.password, user.password!);
    if (!isMatch) {
        return { success: false }
    }

    const payload: TokenPayloadDTO = {
        email: user.email!,
        fullname: user.fullname!,
        id: user._id.toString(),
    };
    const token = {
        access: generateAccessToken(payload),
        refresh: generateRefreshToken(payload)
    };

    return {
        success: true,
        user: {
            email: user.email!,
            fullname: user.fullname!,
            id: user._id.toString(),
            pictureUrl: 'https://placehold.co/400' //TODO: handle profile picture
        },
        token
    }

}



export async function refreshToken(tokenRequest: RefreshTokenDTO): Promise<RefreshTokenResponseDTO> {
    try {
        const payloadObj = verifyToken(tokenRequest.refreshToken!) as TokenPayloadDTO;

        const token = {
            access: generateAccessToken({ email: payloadObj.email!, fullname: payloadObj.fullname, id: payloadObj.id }),
            refresh: generateRefreshToken({ email: payloadObj.email!, fullname: payloadObj.fullname, id: payloadObj.id })
        };
        return {
            success: true,
            token
        }
    } catch (error) {
        return { success: false }
    }
}