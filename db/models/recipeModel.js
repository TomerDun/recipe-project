import { nanoid } from 'nanoid';
import { sequelize } from '../connection.js'
import fs from 'fs';

export async function fetchUserRecipes(id) {
    const [res] = await sequelize.query('SELECT * FROM recipes WHERE userId = :id', { replacements: { id } });
    return res;
}

export async function verifyRecipeId(id) {
    const [res] = await sequelize.query('SELECT id FROM recipes WHERE id = :id', { replacements: { id } });
    return res.length;
}

export async function checkOwner(recipeId, userId) {    
    const [res] = await sequelize.query('SELECT id, userId FROM recipes WHERE id = :recipeId', {replacements: {recipeId}});
    if (!res.length) return false;
    
    
    const recipe = res[0];    

    return recipe.userId === userId;
    


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
            isPublic: (body.isPublic === 'true'),
            instructions: JSON.stringify(body.instructions),
        }
    });

    console.log('--uploaded new recipe');
    return true;
}

export async function deleteRecipe(id) {
    
    // Delete image
    const [imageRes] = await sequelize.query('SELECT imageUrl FROM recipes Where id = :id', {replacements: {id}});    
    
    if (imageRes.length) {    
        const imageUrl = imageRes[0].imageUrl;
        
        imageUrl && fs.promises.unlink(imageUrl);        
    }
    const [res] = await sequelize.query('DELETE FROM recipes WHERE id = :id', {replacements: {id}});

    return true;
}