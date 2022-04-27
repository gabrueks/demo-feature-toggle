import twilioClient from '../utils/twilioClient.js';

const receivedCertificate = [];

const messageBody = 'Essa é uma mensagem enviada pela demo de feature toggle =). Espero que esteja se divertindo';
const certificateMediaURL = (name) => `https://certificado-5264.twil.io/pdf?completo=true&nome=${name}&palestra=Twilio%20Feature%20Toggle&duracao=45%20minutos&evento=CityJS&imagem=/certificado.png`;

export const sendMessage = (to) => {
    return twilioClient
        .messages
        .create({
            body: messageBody,
            from: 'whatsapp:+5511933058313',
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
            from: 'whatsapp:+5511933058313',
            to: `whatsapp:+55${to}`
        });
}
