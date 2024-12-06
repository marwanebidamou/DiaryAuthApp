import { Request, Response, NextFunction } from 'express';
import { CreateDiary, getDiaries } from "../services/diary.service";
import { DiaryResponseDTO, EditDiaryDTO, editDiarySchema, PaginatedDiariesResponseDTO, SearchDiariesDTO } from "../dtos/diary.dto";

export const getDiariesAction = async (
    req: Request<{}, PaginatedDiariesResponseDTO, {}, SearchDiariesDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.connectedUser!.id;
        if (!userId) {
            res.status(403).json({ success: false });
            return;
        }
        // Fetch paginated diaries using the service
        const diaries = await getDiaries(userId, req.query);
        res.status(200).json(diaries);
    } catch (error) {
        next(error);
    }
};


export const createDiaryAction = async (
    req: Request<{}, DiaryResponseDTO, EditDiaryDTO, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.connectedUser?.id;
        if (!userId) {
            res.status(403).json({ success: false });
            return;
        }

        const data = editDiarySchema.parse(req.body);

        const diaries = await CreateDiary(userId, data);
        res.status(200).json(diaries);
    } catch (error) {
        next(error);
    }
};

