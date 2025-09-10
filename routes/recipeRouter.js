import express from 'express';
import { addRecipe, deleteRecipeHandler, getRecipe, getRecipes, getUserRecipesHandler, updateRecipe, } from '../controllers/recipeController.js';
import { recipeExists, recipefilterValidator, recipeSchema, validateRecipe, verifyOwner } from '../middleware/recipeValidation.js';
import { protectedRoute } from '../middleware/authMiddleware.js';
import multer from 'multer';

export const recipeRouter = express.Router();
const upload = multer({dest: 'public/'})

// -- DB --
recipeRouter.get('/', protectedRoute, recipefilterValidator, getRecipes);
recipeRouter.get('/me', protectedRoute, getUserRecipesHandler);
// TODO: ADD VALIDATION FOR PUT AND POST
recipeRouter.post('/', protectedRoute, upload.single('image'), addRecipe);
// TODO: DELETE IMAGE
recipeRouter.delete('/:recipeId', protectedRoute, verifyOwner, deleteRecipeHandler)




//  --OLD--

// recipeRouter.get('/:recipeId', recipeExists, getRecipe);
// recipeRouter.delete('/:recipeId', recipeExists, deleteRecipe);
// recipeRouter.put('/:recipeId', recipeExists, recipeSchema, validateRecipe, updateRecipe);
