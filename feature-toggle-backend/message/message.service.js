import twilioClient from '../utils/twilioClient.js';

const receivedCertificate = [];

const messageBody = "This is an automatic message from feature toggle demo. Hope you're having fun =)";
const certificateMediaURL = (name) => `https://certificado-5264.twil.io/pdf?completo=true&nome=${name}&evangelist=Gabriel%20Bolzi&palestra=Twilio%20Feature%20Toggle&duracao=45%20minutos&evento=CityJS&imagem=/certificado.png`;

export const sendMessage = (to) => {
    return twilioClient
        .messages
        .create({
            body: messageBody,
            from: 'whatsapp:+558000424213',
            to: `whatsapp:+55${to}`
        });
}

export const sendCertificate = (name, to) => {
    if (!!receivedCertificate.find(number => number === to)) {
        console.error(`Certificado já enviado para ${to}`);
        throw new Error('Já enviado');
    }
    receivedCertificate.push(to);
    return twilioClient
        .messages
        .create({
            mediaUrl: certificateMediaURL(name),
            from: 'whatsapp:+558000424213',
            to: `whatsapp:+55${to}`
        });
}
