import express from 'express';
import { protectedRoute } from '../middleware/authMiddleware.js';
import { editComment, likeComment } from '../controllers/commentsController.js';



export const commentsRouter = express.Router({mergeParams: true});

commentsRouter.put('/:commentId', protectedRoute, editComment)
commentsRouter.post('/:commentId/likes', protectedRoute, likeComment);



