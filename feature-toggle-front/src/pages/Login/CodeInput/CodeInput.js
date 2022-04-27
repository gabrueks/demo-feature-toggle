import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

import './code-input.css';

function CodeInput({ submitEvent, err }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [code, setCode] = useState("");

  function handleCodeChange(event) {
    setCode(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit(() => submitEvent(code))} className="code-form">
        <TextField error={errors.code} label="Insira o código" maxLength="6" id="code-input" {...register("code", { required: true })} onChange={handleCodeChange} value={code} />
        {errors.code && <span>{err || "Tá tentando fazer mutreta né"}</span>}
        <Button variant="outlined" type="submit">Confirmar código</Button>
    </form>
  )
}

export default CodeInput;
