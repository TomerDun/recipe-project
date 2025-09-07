import { nanoid } from 'nanoid';
import { sequelize } from '../connection.js'

export async function fetchUserRecipes(id) {
    const [res] = await sequelize.query('SELECT * FROM recipes WHERE userId = :id', { replacements: { id } });
    return res;
}

export async function deleteRecipe(id) {
    await sequelize.query('DELETE FROM recipes WHERE id = :id', { replacements: { id } });
    return true;
}

export async function verifyRecipeId(id) {
    const [res] = await sequelize.query('GET id FROM recipes WHERE id = :id', { replacements: { id } });
    return res.length;
}

export async function createRecipe(body, userId, filePath) {
    const id = nanoid();

    const query = `INSERT INTO recipes (id, title, ingredients, instructions, cookingTime, servings, difficulty, imageUrl, isPublic, userId)
    VALUES (:id ,:title, :ingredients, :instructions, :cookingTime, :servings, :difficulty, :imageUrl, :isPublic, :userId)`;

    const [res] = await sequelize.query(query, {
        replacements: {
            id: id,
            title: body.title,
            ingredients: JSON.stringify(body.ingredients),
            cookingTime: body.cookingTime,
            servings: body.servings,
            difficulty: body.difficulty,
            imageUrl: filePath,
            userId: userId,
            isPublic: body.isPublic,
            instructions: JSON.stringify(body.instructions),
        }
    });

    console.log('--uploaded new recipe');
    return true;


}