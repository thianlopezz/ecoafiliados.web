import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../common/inputs/Input';
import Button from '../common/inputs/Button';
import Select from '../common/inputs/Select';
import Datepicker from '../common/inputs/Datepicker';
import { phone } from '../../helpers/validations';

const genderOptions = [
  { value: 'M', text: 'Male' },
  { value: 'F', text: 'Female' },
  { value: 'O', text: 'Other' },
];

const PersonalInfoForm = ({ loading, usuario, onSubmit, onUsuarioChange }) => {
  const [errors, setErrors] = useState({});

  const _onSubmit = e => {
    e.preventDefault();

    setErrors({});

    let errors = {};
    let valid = true;

    if (!usuario.nombre || usuario.nombre.trim() === '') {
      valid = false;
      errors = { ...errors, nombre: 'Name is required' };
    }

    if (!usuario.apellido || usuario.apellido.trim() === '') {
      valid = false;
      errors = { ...errors, apellido: 'Last name is required' };
    }

    if (!new RegExp(phone).test(usuario.contacto)) {
      valid = false;
      errors = { ...errors, contacto: 'A valid phone number is required' };
    }

    if (!usuario.genero || usuario.genero.trim() === '') {
      valid = false;
      errors = { ...errors, genero: 'Your gender is required' };
    }

    if (!usuario.feNacimiento) {
      valid = false;
      errors = { ...errors, feNacimiento: 'Your date of birth is required' };
    }

    if (!valid) {
      setErrors(errors);
      return;
    }

    onSubmit(usuario);
  };

  const onChange = e => {
    if (e.target) {
      usuario[e.target.name] = e.target.value;
    } else {
      usuario['feNacimiento'] = e.toDate();
    }
    onUsuarioChange(usuario);
  };

  return (
    <form onSubmit={_onSubmit} noValidate>
      <div className="row form-group">
        <div className="col-md-6 col-sm-12">
          <Input
            label="Nombre"
            name="nombre"
            value={usuario.nombre}
            onChange={onChange}
            error={errors.nombre}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <Input
            label="Apellido"
            name="apellido"
            value={usuario.apellido}
            onChange={onChange}
            error={errors.apellido}
          />
        </div>
      </div>
      <Input
        label="Correo personal"
        name="correo"
        disabled={true}
        value={usuario.correo}
        onChange={onChange}
        error={errors.correo}
      />
      <Input
        label="Número de contacto"
        name="contacto"
        value={usuario.contacto}
        onChange={onChange}
        error={errors.contacto}
      />
      <Select
        label="Género"
        name="genero"
        value={usuario.genero}
        options={genderOptions}
        onChange={onChange}
        error={errors.genero}
      />
      <Datepicker
        label="Año de nacimiento"
        name="feNacimiento"
        variant="inline"
        value={usuario.feNacimiento}
        onChange={onChange}
        error={errors.feNacimiento}
      />
      <Button
        type="submit"
        text="Guardar"
        variant="contained"
        className="mr-2 my-4"
        color="primary"
        loading={loading}
      />
    </form>
  );
};

PersonalInfoForm.propTypes = {
  usuario: PropTypes.object,
  onUsuarioChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default PersonalInfoForm;
