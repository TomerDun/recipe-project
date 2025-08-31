import { fetchRecipes } from "../models/recipeModel.js";
import { body, validationResult } from "express-validator";

export function recipefilterValidator(req, res, next) {
    const err = new Error('Invalid Filter Values');
    err.status = 400;

    if (req.query.difficulty) {
        if (req.query.difficulty != 'easy' && req.query.difficulty != 'medium' && req.query.difficulty !== 'hard') {
            err.details = 'invalid difficulty'
            throw err;
        }
    }
    if (req.query.maxCookingTime) {
        if (isNaN(Number(req.query.maxCookingTime))) {
            err.details = 'invalid maxCookingTime'
            throw err;
        }
    }
    next()
}

export function recipeExists(req, res, next) {
    const arrFilter = fetchRecipes().filter(item => item.id === req.params.recipeId);
    if (!arrFilter.length) {
        const err = new Error('Recipe Not Found')
        err.status = 404;
        throw err;
    }
    next()
}


export const recipeSchema = [
    body('title')
        .exists({ checkFalsy: true }).withMessage('title is required')
        .isString().withMessage('title must be a string')
        .isLength({ min: 3, max: 100 }).withMessage('title must be between 3 and 100 characters'),
    body('description')
        .exists({ checkFalsy: true }).withMessage('description is required')
        .isString().withMessage('description must be a string')
        .isLength({ min: 10, max: 500 }).withMessage('description must be between 10 and 500 characters'),
    body('ingredients')
        .exists({ checkFalsy: true }).withMessage('ingredients is required')
        .isArray({ min: 1 }).withMessage('ingredients must have at least one item'),
    body('cookingTime').exists({checkFalsy: true}).isInt(),
    body('serving').exists({checkFalsy: true}).isInt(),
    body('difficulty').exists({checkFalsy: true}).isString().isIn(['easy', 'medium', 'hard']).withMessage('difficulty must be easy | medium | hard')
]

export function validateRecipe(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Recipe Validation Failed');
        err.details = errors.array();
        throw err;
    }
    next()
}