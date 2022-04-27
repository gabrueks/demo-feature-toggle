import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

import { formatPhone } from '../../../utils';

import './phone-input.css';

function PhoneInput({ submitEvent, err }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  return (
      <form onSubmit={handleSubmit(() => submitEvent(phone, name))} className="phone-form">
          <TextField style={{ marginBottom: '10px' }} error={errors.phone} label="Telefone com DDD" maxLength="15" id="phone-input" {...register("phone", { required: true })} onChange={handlePhoneChange} value={phone} />
          <TextField style={{ marginBottom: '10px' }} error={errors.name} label="Seu nome" maxLength="20" id="phone-input" {...register("name", { required: true })} onChange={handleNameChange} value={name} />
          {errors.phone && <span>{err || "Tá tentando fazer mutreta né"}</span>}
          <Button variant="outlined" type="submit">Receber código</Button>
      </form>
  )
}

export default PhoneInput;
