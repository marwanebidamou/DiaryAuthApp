import { NextFunction, Request, Response } from "express";
import { SignInDTO, SignInResponseDTO, signInSchema, SignUpDTO, SignUpResponseDTO, signupSchema } from "../dtos/auth.dto";
import { signIn, signUp } from "../services/auth.service";



export const signUpAction = async (req: Request<undefined, SignUpResponseDTO, SignUpDTO, undefined>, res: Response, next: NextFunction) => {
    try {
        const signUpData = signupSchema.parse(req.body);
        const result = await signUp(signUpData);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const signInAction = async (req: Request<undefined, SignInResponseDTO, SignInDTO, undefined>, res: Response, next: NextFunction) => {
    try {
        const signInData = signInSchema.parse(req.body);
        const result = await signIn(signInData);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};