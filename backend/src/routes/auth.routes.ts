import { Router } from 'express';
import { signInAction, signUpAction } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/sign-up', signUpAction);
authRouter.post('/sign-in', signInAction);

authRouter.get('/refresh', authenticate, (req, res) => {

    res.json({ authenticated: true });

});




export default authRouter;