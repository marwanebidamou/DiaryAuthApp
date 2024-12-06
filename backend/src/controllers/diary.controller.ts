import { Request, Response, NextFunction } from 'express';
import { getDiaries } from "../services/diary.service";
import { PaginatedDiariesResponseDTO, SearchDiariesDTO } from "../dtos/diary.dto";

//async                                 (req: Request<{}, RefreshTokenResponseDTO, RefreshTokenDTO, {}>, res: Response, next: NextFunction) => {
export const getDiariesAction = async (
    req: Request<{}, PaginatedDiariesResponseDTO, {}, SearchDiariesDTO>, // Explicitly define request and response types
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.connectedUser!.id;
        // Fetch paginated diaries using the service
        const diaries = await getDiaries(userId, req.query);
        res.status(200).json(diaries);
    } catch (error) {
        next(error);
    }
};