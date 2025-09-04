import express from 'express';
import { addRecipe, deleteRecipe, getRecipe, getRecipes, getUserRecipesHandler, updateRecipe,  } from '../controllers/recipeController.js';
import { recipeExists, recipefilterValidator, recipeSchema, validateRecipe } from '../middleware/recipeValidation.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

export const recipeRouter = express.Router();

// -- DB --
recipeRouter.get('/me', protectedRoute, getUserRecipesHandler);


recipeRouter.get('/', protectedRoute, recipefilterValidator, getRecipes);
recipeRouter.post('/', recipeSchema, validateRecipe, addRecipe);
recipeRouter.get('/:recipeId', recipeExists, getRecipe);
recipeRouter.delete('/:recipeId', recipeExists, deleteRecipe);
recipeRouter.put('/:recipeId', recipeExists, recipeSchema, validateRecipe, updateRecipe);
