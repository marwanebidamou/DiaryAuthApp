import { Router } from 'express';
import { signInAction, signUpAction } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/sign-up', signUpAction);
authRouter.post('/sign-in', signInAction);



export default authRouter;