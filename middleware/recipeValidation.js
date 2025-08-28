import { allRecipes } from "../models/recipeModel.js";

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
    const arrFilter = allRecipes.filter(item => item.id === req.params.recipeId);
    if (!arrFilter.length) {
        const err = new Error('Recipe Not Found')
        err.status = 404;
        throw err;
    }
    next()
}