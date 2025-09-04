import {sequelize} from '../connection.js'

export async function fetchUserRecipes(id) {
    const [res] = await sequelize.query('SELECT * FROM recipes WHERE userId = :id', {replacements: {id}});
    return res;
}