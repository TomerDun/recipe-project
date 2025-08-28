import express from 'express';
import { getRecipes } from '../controllers/recipeController.js';
import { recipefilterValidator } from '../middleware/recipeValidation.js';

export const recipeRouter = express.Router();

recipeRouter.get('/', recipefilterValidator, getRecipes);