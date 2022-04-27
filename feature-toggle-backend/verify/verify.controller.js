import * as verifyServices from './verify.service.js';

import generateJWT from '../utils/generateJWT.js';

export const getCodeController = async (req, res) => {
    try {
        if (!req.body.phone) {
            return res.json({
                code: "WRONG_INPUT"
            }).status(400);
        }
        const code = await verifyServices.getCodeService(req.body.phone);
        return res.json({ code }).status(200);
    } catch (err) {
        console.error(err);
        return res.json({
            code: "UNEXPECTED_ERROR"
        }).status(500);
    }
}

export const checkCodeController = async (req, res) => {
    try {
        console.log(req.body)
        if (!req.body.code || !req.body.phone || !req.body.name) {
            return res.json({
                code: "WRONG_INPUT"
            }).status(400); 
        }
        const valid = await verifyServices.checkCode(req.body.code, req.body.phone);
        const jwt = generateJWT({ phone: req.body.phone, name: req.body.name })
        return res.json({ valid, jwt }).status(valid ? 200 : 401);
    } catch (err) {
        console.error(err);
        return res.json({
            code: "UNEXPECTED_ERROR"
        }).status(500);
    }
}
