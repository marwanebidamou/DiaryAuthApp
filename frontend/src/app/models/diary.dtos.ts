
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

export type EditDiaryDTO = {
    title: string;
    description: string;
}