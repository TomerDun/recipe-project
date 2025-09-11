import express from 'express';
import { addRecipe, deleteRecipeHandler, getRecipe, getRecipes, getUserRecipesHandler, updateRecipeHandler, } from '../controllers/recipeController.js';
import { recipeExists, recipefilterValidator, recipeSchema, validateRecipe, verifyOwner } from '../middleware/recipeValidation.js';
import { protectedRoute } from '../middleware/authMiddleware.js';
import multer from 'multer';
import { commentsRouter } from './commentsRouter.js';

export const recipeRouter = express.Router();
recipeRouter.use('/:recipeId/comments', commentsRouter)
const upload = multer({dest: 'public/'})

// -- DB --
recipeRouter.get('/', protectedRoute, recipefilterValidator, getRecipes);
recipeRouter.get('/me', protectedRoute, getUserRecipesHandler);
// TODO: ADD VALIDATION FOR PUT AND POST
recipeRouter.post('/', protectedRoute, upload.single('image'), addRecipe);
recipeRouter.put('/:recipeId', protectedRoute, verifyOwner, upload.single('image'), updateRecipeHandler);
// TODO: DELETE IMAGE
recipeRouter.delete('/:recipeId', protectedRoute, verifyOwner, deleteRecipeHandler)


//  --OLD--

// recipeRouter.get('/:recipeId', recipeExists, getRecipe);
// recipeRouter.delete('/:recipeId', recipeExists, deleteRecipe);
// recipeRouter.put('/:recipeId', recipeExists, recipeSchema, validateRecipe, updateRecipe);
