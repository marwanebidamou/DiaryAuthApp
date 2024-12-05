import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.util";
import { TokenPayloadDTO } from "../dtos/auth.dto";


export const authenticate = (req: Request, res: Response, next: NextFunction) => {

    try {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Unauthorized: No token provided' });
            return;
        }

        const token = authHeader.split(' ')[1]; // Extract the token

        // Verify the token
        const decoded = verifyToken(token) as TokenPayloadDTO;
        req.connectedUser = {
            email: decoded.email,
            fullname: decoded.fullname,
            id: decoded.id
        };

        // Proceed to the next middleware or route handler
        next();

    } catch {
        res.status(401).json({ error: 'Unauthorized. Invalid token.' });
    }
}