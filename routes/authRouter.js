import {Router} from 'express'
import { getProfileHandler, login, register } from '../controllers/authController.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/profile', protectedRoute ,getProfileHandler);