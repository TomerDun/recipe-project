import { addFavorite, getFavorites, removeFavorite } from "../db/models/favoritesModel.js";

export async function addFavoriteHandler(req, res) {
    await addFavorite(req.params.recipeId, req.user.id)
    res.status(201).send('Added to favorites');
}

export async function removeFavoriteHandler(req, res) {
    const success = await removeFavorite(req.params.recipeId, req.user.id);
    if (success) {res.status(204).send('Removed');}
    else {
        res.status(400).send('No rows affected');
    }
}

export async function getFavoritesHandler(req, res) {
    const favs = await getFavorites(req.user.id);
    res.status(200).json(favs);
}