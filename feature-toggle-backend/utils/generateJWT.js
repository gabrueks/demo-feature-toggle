import jwt from 'jsonwebtoken';

const privateKey = process.env.PRIVATE_KEY;

export default function generateJWT(data) {
    return jwt.sign(data, privateKey, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });
}
