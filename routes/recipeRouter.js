import express from 'express';
import { getRecipes } from '../controllers/recipeController.js';

export const recipeRouter = express.Router();

recipeRouter.get('/', getRecipes);