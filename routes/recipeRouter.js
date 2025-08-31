import express from 'express';
import { addRecipe, deleteRecipe, getRecipe, getRecipes, updateRecipe,  } from '../controllers/recipeController.js';
import { recipeExists, recipefilterValidator, recipeSchema, validateRecipe } from '../middleware/recipeValidation.js';

export const recipeRouter = express.Router();

recipeRouter.get('/', recipefilterValidator, getRecipes);
recipeRouter.post('/', recipeSchema, validateRecipe, addRecipe);
recipeRouter.get('/:recipeId', recipeExists, getRecipe);
recipeRouter.delete('/:recipeId', recipeExists, deleteRecipe);
recipeRouter.put('/:recipeId', recipeExists, recipeSchema, validateRecipe, updateRecipe);