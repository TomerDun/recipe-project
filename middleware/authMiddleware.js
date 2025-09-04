import jwt from 'jsonwebtoken'

export function protectedRoute(req, res, next) {
    const err = new Error('Unauthorized')
    err.details = 'Missing token';
    err.stauts - 401;

    if (!req.header('Authorization')) {
        throw err;
    }

    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {                
        throw err;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            err.details = 'Token expired'
            throw err;
        }
        err.details = 'Invalid token';
        throw err;
    }
};

