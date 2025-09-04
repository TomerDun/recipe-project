import {sequelize} from '../connection.js'

export async function fetchUserRecipes(id) {
    const [res] = await sequelize.query('SELECT * FROM recipes WHERE userId = :id', {replacements: {id}});
    return res;
}

export async function deleteRecipe(id) {
    await sequelize.query('DELETE FROM recipes WHERE id = :id', {replacements: {id}});
    return true;
}

export async function verifyRecipeId(id) {
    const [res] = await sequelize.query('GET id FROM recipes WHERE id = :id', {replacements: {id}});
    return res.length;
}

export async function createRecipe(newRecipe) {
    
}