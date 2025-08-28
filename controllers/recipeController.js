import { allRecipes } from "../models/recipeModel.js";

// TODO: Validate query params
export function getRecipes(req, res) {    
    let recipes = allRecipes;
    if (req.query.difficult) {
        recipes = recipes.filter(r => r.difficulty === req.query.difficulty);
    }

    if (req.query.maxCookingTime) {
        recipes = recipes.filter(r => r.cookingTime <= Number(req.query.maxCookingTime))
    }

    if (req.query.search) {
        recipes = recipes.filter(r => r.title.includes(req.params.search) || r.description.includes(req.params.search));
    }

    res.status(200).json(recipes);
}

export function getRecipe(req,res) {
    const output = allRecipes.filter(r => r.id == req.params.recipeId)[0];
    console.log(output);
    
    res.status(200).json(output);
}