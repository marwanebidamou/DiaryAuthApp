import { z } from 'zod';

// Schema for creating a diary entry
export const editDiarySchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(100, "Title should be less than 100 characters"),
    description: z
        .string()
        .trim()
        .min(1, "Description is required")
        .max(500, "Description should be less than 500 characters"),
});


// Automatically infer TypeScript types from the schemas
export type EditDiaryDTO = z.infer<typeof editDiarySchema>;

export type DiaryResponseDTO = {
    id?: string;
    title?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type PaginatedDiariesResponseDTO = {
    success: boolean;
    diaries?: DiaryResponseDTO[];
    pagination?: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
};

export type CreateDiaryResponseDTO = {
    success: boolean;
    diary: DiaryResponseDTO;
};

export type DeleteDiaryResponseDTO = {
    success: boolean;
};

export type DiaryParamsDTO = {
    diaryId: string;
};

export type SearchDiariesDTO = {
    page: number;
    limit: number;
    query: string
}