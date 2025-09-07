import { fetchUserRecipes } from "../db/models/recipeModel.js";
import { fetchRecipes, setRecipes } from "../models/recipeModel.js";
import { createRecipe } from "../db/models/recipeModel.js";

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

export async function addRecipe(req, res) {
    console.log('BODY: ', req.body);
    
    await createRecipe(req.body, req.user.id, req.file ? req.file.path : null);
    res.sendStatus(201);
}

export function deleteRecipe(req, res) {        
    const newRecipes = fetchRecipes().filter(r => r.id != req.params.recipeId);                    
    setRecipes(newRecipes);
    res.sendStatus(204);
}

export function updateRecipe(req, res) {
    const recipes = fetchRecipes();
    const updateIndex = recipes.findIndex(r => r.id == req.params.recipeId);
    const updateRecipe = recipes[updateIndex];

    recipes[updateIndex] = {...updateRecipe, ...req.body};
    res.status(201).json(recipes[updateIndex]);
}

// --DB--

export async function getUserRecipesHandler(req, res) {
    const recipes = await fetchUserRecipes(req.user.id);
    res.status(200).json(recipes);
}

// TODO: Add delete image file
export async function deleteRecipeHandler(req, res) {
    await deleteRecipe(req.params.recipeId);
}
