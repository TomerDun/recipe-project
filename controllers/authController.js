import { createUser } from "../db/models/authModel.js";
import jwt from 'jsonwebtoken';

// TODO: Add tokens to cookies
export async function register(req, res) {
    const newUser = await createUser(req.body);

    const newToken = generateToken({userId: newUser.id, email: newUser.email});
    res.status(201).json({
        'message': 'created new user',
        user: newUser,
        token: newToken,
    })
}

function generateToken(data) {
    const newToken = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '1h'});
    return newToken;
}