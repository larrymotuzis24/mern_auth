import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';


export const veriftyToken = (req, res, next ) => {
    const token = req.cookie.access_token;

    if(!token) return next(errorHandler(401, 'Access Denied'))

    jwt.verify(token, process.env.JWT_SECRET, (error, user ) => {
        if(error) return next(errorHandler(403, 'Token is not valid!!'));

        req.user = user;
        next();
    });

};