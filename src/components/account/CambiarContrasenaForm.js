import React, { useState } from 'react';

import Input from '../common/inputs/Input';
import Button from '../common/inputs/Button';

const CambiarContrasenaForm = ({ loading, onSubmit }) => {
  let [errors, setErrors] = useState({});
  let [doublePassword, setDoublePassword] = useState({});

  const _onSubmit = e => {
    e.preventDefault();

    setErrors({ errors: {} });

    let errors = {};
    let valid = true;

    if (!doublePassword.contrasena || doublePassword.contrasena === '') {
      valid = false;
      errors = { ...errors, contrasena1: 'Current password is required' };
    }

    if (doublePassword.contrasena1 && doublePassword.contrasena1.length < 8) {
      valid = false;
      errors = {
        ...errors,
        contrasena1: 'Password must be at least 8 characters long',
      };
    }

    if (doublePassword.contrasena1 !== doublePassword.contrasena2) {
      valid = false;
      errors = {
        ...errors,
        contrasena1: 'Passwords must match',
        contrasena2: 'Passwords must match',
      };
    }

    if (!valid) {
      setErrors({ ...errors });
      return;
    }
    onSubmit(doublePassword);
  };

  const onInputChange = e => {
    doublePassword[e.target.name] = e.target.value;
    setDoublePassword({ ...doublePassword });
  };

  return (
    <form onSubmit={_onSubmit} noValidate>
      <Input
        type="password"
        label="Contraseña actual"
        name="contrasena"
        variant="outlined"
        value={doublePassword.contrasena}
        onChange={onInputChange}
        error={errors.contrasena}
      />
      <Input
        type="password"
        label="Nueva contraseña"
        name="contrasena1"
        variant="outlined"
        value={doublePassword.contrasena1}
        onChange={onInputChange}
        error={errors.contrasena1}
      />
      <Input
        type="password"
        label="Repite la nueva contraseña"
        name="contrasena2"
        variant="outlined"
        value={doublePassword.contrasena2}
        onChange={onInputChange}
        error={errors.contrasena2}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        text="Actualizar"
        loading={loading}
      />
    </form>
  );
};

export default CambiarContrasenaForm;
