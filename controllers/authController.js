import { createUser, getProfile, getUser } from "../db/models/authModel.js";
import jwt from 'jsonwebtoken';


// --Utils--

function generateToken(data) {
    const newToken = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '8h'});
    return newToken;
}

// --API Handlers--

// TODO: Add tokens to cookies
export async function register(req, res) {
    const newUser = await createUser(req.body);

    const newToken = generateToken({id: newUser.id, email: newUser.email, username: newUser.username});
    res.status(201).json({
        'message': 'created new user',
        user: newUser,
        token: newToken,
    })
}

export async function login(req, res) {
    const user = await getUser(req.body.email, req.body.password);
    // Generate token for user
    const token = generateToken({id: user.id, email: user.email, username: user.username});
    res.status(200).json({user, token});
}

export async function getProfileHandler(req, res) {
    console.log('!Started GetProfile Function!');
    
    console.log('------REQ.user: ', req.user);
    // console.log(req);
    
    const id = req.user.id;
    const user = await getProfile(id);
    res.status(200).json(user);
}

