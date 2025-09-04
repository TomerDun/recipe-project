import { createUser, getUser } from "../db/models/authModel.js";
import jwt from 'jsonwebtoken';


// --Utils--

function generateToken(data) {
    const newToken = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '1h'});
    return newToken;
}

// --API Handlers--

// TODO: Add tokens to cookies
export async function register(req, res) {
    const newUser = await createUser(req.body);

    const newToken = generateToken({id: newUser.id, email: newUser.email});
    res.status(201).json({
        'message': 'created new user',
        user: newUser,
        token: newToken,
    })
}

export async function login(req, res) {
    const user = await getUser(req.body.email, req.body.password);
    // Generate token for user
    const token = generateToken({id: user.id, email: user.email});
    res.status(200).json({user, token});
}

