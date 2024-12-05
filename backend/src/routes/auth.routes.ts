import { Router } from 'express';
import { signUpAction } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/sign-up', signUpAction);


export default authRouter;