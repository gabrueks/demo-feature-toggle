import * as messageService from './message.service.js';

export const sendMessage = async (req, res) => {
    try {
        await messageService.sendMessage(req.locals.phone.replace(/\D/g, ""));
        res.status(200).json({});
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            code: "UNEXPECTED_ERROR"
        });
    }
}

export const sendCertificate = async (req, res) => {
    try {
        await messageService.sendCertificate(req.locals.name.replaceAll(' ', '%20'), req.locals.phone.replace(/\D/g, ""));
        res.status(200).json({});
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            code: "UNEXPECTED_ERROR"
        });
    }
}
