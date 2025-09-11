import { nanoid } from "nanoid";
import { sequelize } from "../connection.js";

export async function addFavorite(recipeId, userId) {
    await sequelize.query('INSERT INTO userfavorites (userId, recipeId) VALUES (:userId, :recipeId)', {
        replacements: {
            userId, recipeId
        }
    }
    )

    return true;
}

export async function removeFavorite(recipeId, userId) {
    const [_, metadata] = await sequelize.query('DELETE FROM userFavorites WHERE recipeId=:recipeId AND userID = :userId', {replacements: {recipeId, userId}});
    return (metadata.affectedRows > 0);            
}

export async function getFavorites(userId) {    
    const query = `SELECT recipeId, recipes.title FROM userFavorites JOIN recipes ON recipes.id = recipeId WHERE userFavorites.userId = :userId`;
    const [res] = await sequelize.query(query, {replacements: {userId}});
    return res;
}