import express from 'express';
import { protectedRoute } from '../middleware/authMiddleware.js';
import { addComment } from '../controllers/commentsController.js';



export const commentsRouter = express.Router({mergeParams: true});

// -- DB --
commentsRouter.post('/', protectedRoute, addComment);


