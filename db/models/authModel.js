import { v4 } from "uuid";
import { sequelize } from '../connection.js'
import bcrypt from 'bcrypt';


function hashPass(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

// TODO: Add password hashing!
export async function createUser({ username, password, email, firstName, lastName }) {
    const id = v4();
    const query = `INSERT INTO users (username, password, email, firstName, lastName)
    VALUES (:username, :password, :email, :firstName, :lastName)`;
    // const password = encryptPassword(password);
    password = hashPass(password);

    const [res] = await sequelize.query(query,
        {
            replacements: {
                id: id,
                username: username,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName
            }
        });
    console.log('➕ Added new user to DB');

    return {
        id: id,
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName
    }
}

export async function getUser(email, password) {
    const [res] = await sequelize.query(`SELECT * FROM users WHERE email = :email`, { replacements: { email } });

    // User not found
    if (!res.length) {
        console.error('getUser: email not found')
        const err = new Error('Invalid email/password')
        err.status = 403;
        throw err;
    }

    const user = res[0];
    console.log('user: ', user);
    
    const passwordValid = await bcrypt.compare(password, user.password);
    console.log('valid: ', passwordValid);
    
    if (!passwordValid) {
        console.error('getUser: password invalid')
        const err = new Error('Invalid email/password')
        err.status = 403;
        throw err;
    }

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }
}

export async function getProfile(id) {
    const [res] = await sequelize.query('SELECT * FROM users WHERE id = :id', {replacements: {id}});
    const user = res[0];
    delete user.password;

    return user;
}