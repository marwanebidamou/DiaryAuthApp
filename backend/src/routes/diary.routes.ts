import { Router } from 'express';
import { refreshTokenAction, signInAction, signUpAction } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { createDiaryAction, getDiariesAction, updateDiaryAction } from '../controllers/diary.controller';

const diaryRouter = Router();

diaryRouter.get('/', authenticate, getDiariesAction);
diaryRouter.post('/', authenticate, createDiaryAction);
diaryRouter.put('/:diaryId', authenticate, updateDiaryAction);

export default diaryRouter;