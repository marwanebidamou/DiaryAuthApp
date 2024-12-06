import { Router } from 'express';
import { refreshTokenAction, signInAction, signUpAction } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { createDiaryAction, deleteDiaryAction, getDiariesAction, updateDiaryAction } from '../controllers/diary.controller';

const diaryRouter = Router();

diaryRouter.get('/', authenticate, getDiariesAction);
diaryRouter.post('/', authenticate, createDiaryAction);
diaryRouter.put('/:diaryId', authenticate, updateDiaryAction);
diaryRouter.delete('/:diaryId', authenticate, deleteDiaryAction);

export default diaryRouter;