import { v4 } from "uuid";
import {sequelize} from '../connection.js'
import bcrypt from 'bcrypt';


function hashPass(password){
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password,salt);
}

// TODO: Add password hashing!
export async function createUser({username, password, email, firstName, lastName}) {    
    const id = v4();
    const query = `INSERT INTO users (username, password, email, firstName, lastName)
    VALUES (:username, :password, :email, :firstName, :lastName)`;
    // const password = encryptPassword(password);
    password = hashPass(password);

    const [res] = await sequelize.query(query, 
        {replacements: {
            id: id,
            username: username,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName        
        }});
    console.log('➕ Added new user to DB');

    return {
        id: id,
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName
    }     
}