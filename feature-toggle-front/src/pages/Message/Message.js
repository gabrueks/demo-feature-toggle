import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { withLDConsumer } from 'launchdarkly-react-client-sdk';
import { VerifiedUser as VerifiedUserIcon, Send as SendIcon } from '@mui/icons-material';
import { Button } from '@mui/material';

import { sendMessage, sendCertificate } from '../../api/message';

import './message.css';

function Message({ flags }) {
    const { sendMessageDemo, getCertificateDemo } = flags;
    const [certificateSuccessMessage, setCertificateSuccessMessage] = useState('');
    const [messageSuccessMessage, setMessageSuccessMessage] = useState('');
    const [certificateErr, setCertificateErr] = useState(null);
    const [messageErr, setMessageErr] = useState(null);

    const navigate = useNavigate();
    const jwt = useSelector(state => state.user.jwt);

    useEffect(() => {
        if (!jwt || jwt === '') {
            navigate('/');
        }
    }, [navigate, jwt]);

    const handleSendMessage = () => {
        sendMessage(jwt)
            .then(() => {
                setMessageSuccessMessage('Mensagem enviada com sucesso!');
                setTimeout(() => {
                    setMessageSuccessMessage('');
                }, 3000)
            })
            .catch((error) => { setMessageErr(error.message || true) })
    }

    const handleSendCertificate = () => {
        sendCertificate(jwt)
            .then(() => {
                setCertificateSuccessMessage('Certificado enviado com sucesso!');
                setTimeout(() => {
                    setCertificateSuccessMessage('');
                }, 3000)
            })
            .catch((error) => { setCertificateErr(error.message || true) })
    }

    return (
        <div className="login-container">
            <div className="messages-container">
                {getCertificateDemo && (
                    <div className="certificate-container">
                        <VerifiedUserIcon />
                        <Button onClick={handleSendCertificate} variant="outlined" type="submit">Receber certificado</Button>
                        {certificateErr && <span>{certificateErr || "Algo deu errrado com o certificado."}</span>}
                        {certificateSuccessMessage && <span>{certificateErr}</span>}
                    </div>
                )}
                {sendMessageDemo && (
                    <div className="message-container">
                        <SendIcon />
                        <Button onClick={handleSendMessage} variant="outlined" type="submit">Enviar mensagem</Button>
                        {messageErr && <span>{messageErr || "Algo deu errrado com a mensagem."}</span>}
                        {messageSuccessMessage && <span>{messageSuccessMessage}</span>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default withLDConsumer()(Message);
