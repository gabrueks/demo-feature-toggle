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
        throw new Error('Failed to send certificate, you can have only one certificate');
    }
}
