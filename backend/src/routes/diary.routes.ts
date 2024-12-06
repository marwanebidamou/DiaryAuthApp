import { Router } from 'express';
import { refreshTokenAction, signInAction, signUpAction } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { createDiaryAction, getDiariesAction } from '../controllers/diary.controller';

const diaryRouter = Router();

diaryRouter.get('/', authenticate, getDiariesAction);
diaryRouter.post('/', authenticate, createDiaryAction);

export default diaryRouter;