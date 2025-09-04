import { createUser } from "../db/models/authModel.js";

export async function register(req, res) {
    const newUser = await createUser(req.body);
    res.status(201).json({
        'message': 'created new user',
        user: newUser
    })
}