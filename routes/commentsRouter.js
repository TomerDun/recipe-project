import express from 'express';
import { protectedRoute } from '../middleware/authMiddleware.js';
import { editComment } from '../controllers/commentsController.js';



export const commentsRouter = express.Router({mergeParams: true});

commentsRouter.put('/:commentId', protectedRoute, editComment)



