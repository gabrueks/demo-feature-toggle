import apiInstance from "./config";

const PATH = '/message';

export const sendMessage = async (jwt) => {
    try {
        await apiInstance.post(PATH, {}, {
            headers: {
                Authorization: jwt
            }
        });
    } catch (_err) {
        throw new Error('Erro ao enviar mensagem.');
    }
}

export const sendCertificate = async (jwt) => {
    try {
       await apiInstance.post(`${PATH}/certificate`, {}, {
            headers: {
                Authorization: jwt
            }
        });
    } catch (_err) {
        throw new Error('Erro ao enviar certificado, lembrando que você só pode pegar um certificado.');
    }
}
