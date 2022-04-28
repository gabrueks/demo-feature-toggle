import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { setPhone, setJWT, setName } from '../../redux/phone/phone';

import PhoneInput from './PhoneInput/PhoneInput';
import CodeInput from './CodeInput/CodeInput';

import { getCode, checkCode } from '../../api/verify';
import { formatToOnlyDigits } from '../../utils';

import './login.css';

function Login() {
    const navigate = useNavigate();

    const jwt = useSelector(state => state.user.jwt);
    const phone = useSelector(state => state.user.phone);
    const name = useSelector(state => state.user.name);

    const dispatch = useDispatch();

    const [isCodeSent, setIsCodeSent] = useState(false);
    const [err, setErr] = useState(null);

    function handlePhoneSubmit(phone, name) {
      getCode(formatToOnlyDigits(phone))
        .then(() => {
          dispatch(setPhone(phone));
          dispatch(setName(name));
          setIsCodeSent(true);
        })
        .catch((err) => { setErr(err.message) })
    }

    function handleCodeSubmit(code) {
      checkCode({ code, phone: formatToOnlyDigits(phone), name })
        .then(({ data }) => {
          dispatch(setJWT(data.jwt));
          navigate('/message');
        })
        .catch((err) => { setErr(err.message) })
    }

    useEffect(() => {
      if (jwt !== '') {
        navigate('/message');
      }
    }, [jwt, navigate]);

    return (
      <div className="login-container">
        <div className="info-container">
          <Typography color="#2a9d8f" variant="h5" align="center">Olá, seja bem vindo a demonstração de feature toggle</Typography>
          {isCodeSent ? <CodeInput submitEvent={handleCodeSubmit} err={err} /> : <PhoneInput submitEvent={handlePhoneSubmit} err={err} />}
        </div>
      </div>
    );
  }
  
  export default Login;
  