import apiInstance from "./config";

const PATH = '/verify';

export const getCode = async (phone) => {
    try {
        await apiInstance.post(PATH, {
            phone
        })
    } catch (_err) {
        throw new Error('Aconteceu algo ao enviar o código');
    }
}

export const checkCode = async ({ code, phone, name }) => {
    try {
        const axiosResponse = await apiInstance.post(`${PATH}/check`, {
            phone,
            code,
            name
        });
        return axiosResponse;
    } catch (_err) {
        throw new Error('Erro ao checar código. O mesmo pode estar errado');
    }
}
