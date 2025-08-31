import { createRecipe, fetchRecipes, setRecipes } from "../models/recipeModel.js";

// TODO: Validate query params
export function getRecipes(req, res) {    
    let recipes = fetchRecipes();
    if (req.query.difficult) {
        recipes = recipes.filter(r => r.difficulty === req.query.difficulty);
    }

    if (req.query.maxCookingTime) {
        recipes = recipes.filter(r => r.cookingTime <= Number(req.query.maxCookingTime))
    }

    if (req.query.search) {
        recipes = recipes.filter(r => r.title.includes(req.query.search) || r.description.includes(req.query.search));
    }

    res.status(200).json(recipes);
}

export function getRecipe(req,res) {
    const output = fetchRecipes().filter(r => r.id == req.params.recipeId)[0];    
    
    res.status(200).json(output);
}

export function addRecipe(req, res) {
    createRecipe(res.body);
    res.sendStatus(201);
}

export function deleteRecipe(req, res) {
    console.log(req.params.recipeId);
    
    const newRecipes = fetchRecipes().filter(r => r.id != req.params.recipeId);                    
    setRecipes(newRecipes);
    res.sendStatus(204);
}