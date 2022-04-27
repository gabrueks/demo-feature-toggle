import decodeJWT from '../utils/decodeJWT.js';

export default function decodeJWTMiddleware(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                code: 'UNAUTHORIZED'
            });
        }
    
        const userData = decodeJWT(req.headers.authorization);
    
        req.locals = userData;
    
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({
            code: 'UNAUTHORIZED'
        });
    }
}
