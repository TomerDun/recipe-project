import express from 'express';
import { addRecipe, deleteRecipeHandler, getRecipe, getRecipes, getUserRecipesHandler, updateRecipeHandler, } from '../controllers/recipeController.js';
import { recipeExists, recipefilterValidator, recipeSchema, validateRecipe, verifyOwner } from '../middleware/recipeValidation.js';
import { protectedRoute } from '../middleware/authMiddleware.js';
import multer from 'multer';
import { commentsRouter } from './commentsRouter.js';
import { addComment } from '../controllers/commentsController.js';

export const recipeRouter = express.Router();
const upload = multer({dest: 'public/'})

// -- DB --
recipeRouter.get('/', protectedRoute, recipefilterValidator, getRecipes);
recipeRouter.get('/me', protectedRoute, getUserRecipesHandler);
// TODO: ADD VALIDATION FOR PUT AND POST
recipeRouter.post('/', protectedRoute, upload.single('image'), addRecipe);
recipeRouter.put('/:recipeId', protectedRoute, verifyOwner, upload.single('image'), updateRecipeHandler);
recipeRouter.delete('/:recipeId', protectedRoute, verifyOwner, deleteRecipeHandler)

// Comments
recipeRouter.post('/:recuoeId/comments', protectedRoute, addComment);


//  --OLD--

// recipeRouter.get('/:recipeId', recipeExists, getRecipe);
// recipeRouter.delete('/:recipeId', recipeExists, deleteRecipe);
// recipeRouter.put('/:recipeId', recipeExists, recipeSchema, validateRecipe, updateRecipe);
