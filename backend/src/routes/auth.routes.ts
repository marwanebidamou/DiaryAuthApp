import { Router } from 'express';
import { refreshTokenAction, signInAction, signUpAction } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/sign-up', signUpAction);
authRouter.post('/sign-in', signInAction);

authRouter.get('/refresh-token', refreshTokenAction);




export default authRouter;