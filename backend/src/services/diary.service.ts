import mongoose from "mongoose";
import { DiaryModel } from "../models/diary.model";
import { PaginatedDiariesResponseDTO, SearchDiariesDTO } from "../dtos/diary.dto";


export async function CreateDiary() {
    let id = new mongoose.Types.ObjectId();

    return await DiaryModel.create({ title: "test", description: 'test', user_id: id });
}

export async function getDiaries(
    userId: string,
    searchParams: SearchDiariesDTO
): Promise<PaginatedDiariesResponseDTO> {
    const { page, limit } = searchParams;

    // Calculate skip and limit for MongoDB query
    const skip = (page - 1) * limit;
    console.log('user id', userId);
    // Fetch diaries and total count
    const [diaries, totalItems] = await Promise.all([
        DiaryModel.find({ user_id: userId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }), // Most recent first
        DiaryModel.countDocuments({ user_id: userId }),
    ]);

    // Prepare the paginated response
    const totalPages = Math.ceil(totalItems / limit);

    return {
        success: true,
        pagination: {
            totalItems,
            totalPages,
            currentPage: page,
            limit: limit
        },
        diaries: diaries.map((diary) => ({
            id: diary.id.toString(),
            title: diary.title!,
            description: diary.description!,
            createdAt: diary.createdAt.toISOString(),
            updatedAt: diary.updatedAt.toISOString(),
        })),
    };
}