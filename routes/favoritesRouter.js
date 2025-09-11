import express from 'express';
import { protectedRoute } from '../middleware/authMiddleware.js';
import { addFavoriteHandler, getFavoritesHandler, removeFavoriteHandler } from '../controllers/favoritesController.js';


export const favoritesRouter = express.Router();

// -- DB --
favoritesRouter.get('/', protectedRoute, getFavoritesHandler);
favoritesRouter.post('/:recipeId', protectedRoute, addFavoriteHandler);
favoritesRouter.delete('/:recipeId', protectedRoute, removeFavoriteHandler);


