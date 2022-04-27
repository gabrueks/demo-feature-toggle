import twilioClient from '../utils/twilioClient.js';

const twilioVerifySID = process.env.TWILIO_VERIFY_SID;

export const getCodeService = async (to) => {
    return twilioClient
        .verify
        .services(twilioVerifySID)
        .verifications
        .create({
            to: `+55${to}`,
            channel: 'whatsapp'
        });
}

export const checkCode = async (code, to) => {
    const verifyResponse = await twilioClient
        .verify
        .services(twilioVerifySID)
        .verificationChecks
        .create({
            to: `+55${to}`,
            code
        });
    return verifyResponse.valid;
}
