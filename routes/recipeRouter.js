import express from 'express';
import { getRecipe, getRecipes } from '../controllers/recipeController.js';
import { recipeExists, recipefilterValidator } from '../middleware/recipeValidation.js';

export const recipeRouter = express.Router();

recipeRouter.get('/', recipefilterValidator, getRecipes);
recipeRouter.get('/:recipeId', recipeExists, getRecipe);