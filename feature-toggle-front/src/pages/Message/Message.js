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
    const [certificateLoadingMessage, setcertificateLoadingMessage] = useState(null);
    const [messageLoadingMessage, setMessageLoadingMessage] = useState(null);

    const navigate = useNavigate();
    const jwt = useSelector(state => state.user.jwt);

    useEffect(() => {
        if (!jwt || jwt === '') {
            navigate('/');
        }
    }, [navigate, jwt]);

    const handleSendMessage = () => {
        setMessageLoadingMessage('Sending message...');
        sendMessage(jwt)
            .then(() => {
                setMessageLoadingMessage(null);
                setMessageSuccessMessage('Message sent!');
                setTimeout(() => {
                    setMessageSuccessMessage('');
                }, 3000)
            })
            .catch((error) => {
                setMessageLoadingMessage(null);
                setMessageErr(error.message || true);
            })
    }

    const handleSendCertificate = () => {
        setcertificateLoadingMessage('Sending certificate...');
        sendCertificate(jwt)
            .then(() => {
                setcertificateLoadingMessage(null);
                setCertificateSuccessMessage('Certificate sent!');
                setTimeout(() => {
                    setCertificateSuccessMessage('');
                }, 3000)
            })
            .catch((error) => {
                setcertificateLoadingMessage(null);
                setCertificateErr(error.message || true)
            })
    }

    return (
        <div className="login-container">
            <div className="messages-container">
                {getCertificateDemo && (
                    <div className="certificate-container">
                        <VerifiedUserIcon />
                        <Button onClick={handleSendCertificate} variant="outlined" type="submit">Receive certificate</Button>
                        {certificateLoadingMessage && <span>{certificateLoadingMessage}</span>}
                        {certificateErr && <span>{certificateErr || "Something went wrong."}</span>}
                        {certificateSuccessMessage && <span>{certificateErr}</span>}
                    </div>
                )}
                {sendMessageDemo && (
                    <div className="message-container">
                        <SendIcon />
                        <Button onClick={handleSendMessage} variant="outlined" type="submit">Receive message</Button>
                        {messageLoadingMessage && <span>{messageLoadingMessage}</span>}
                        {messageErr && <span>{messageErr || "Something went wrong."}</span>}
                        {messageSuccessMessage && <span>{messageSuccessMessage}</span>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default withLDConsumer()(Message);
