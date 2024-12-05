import { NextFunction, Request, Response } from "express";
import { SignUpDTO, SignUpResponseDTO, signupSchema } from "../dtos/auth.dto";
import { signUp } from "../services/auth.service";



export const signUpAction = async (req: Request<undefined, SignUpResponseDTO, SignUpDTO, undefined>, res: Response, next: NextFunction) => {
    try {
        const signUpData = signupSchema.parse(req.body);
        const result = await signUp(signUpData);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};