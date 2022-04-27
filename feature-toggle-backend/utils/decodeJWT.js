import jwt from 'jsonwebtoken';

const privateKey = process.env.PRIVATE_KEY;

export default function decodeJWT(data) {
    return jwt.verify(data, privateKey);
}
