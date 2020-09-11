import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../common/inputs/Input';
import Button from '../common/inputs/Button';
import Select from '../common/inputs/Select';

const ProfileInfoForm = ({
  usuario,
  onSubmit,
  onUsuarioChange,
  loading,
  paisesOption,
  onCancel,
}) => {
  const [errors, setErrors] = useState({ usuario });

  const _onSubmit = e => {
    e.preventDefault();
    setErrors({});

    let errors = {};
    let valid = true;

    if (!usuario.about || usuario.about.trim() === '') {
      valid = false;
      errors = { ...errors, about: 'Tell something about you' };
    }

    if (!usuario.idPais) {
      valid = false;
      errors = { ...errors, idPais: 'Your country location is required' };
    }

    if (!valid) {
      setErrors(errors);
      return;
    }

    onSubmit(usuario);
  };

  const onChange = e => {
    usuario[e.target.name] = e.target.value;
    onUsuarioChange(usuario);
  };

  return (
    <form onSubmit={_onSubmit} noValidate>
      <Input
        label="About"
        name="about"
        multiline={true}
        rows={4}
        value={usuario.about}
        onChange={onChange}
        error={errors.about}
      />
      <Select
        label="Location"
        name="idPais"
        value={usuario.idPais}
        options={paisesOption}
        onChange={onChange}
        error={errors.idPais}
      />
      <Button
        type="submit"
        text="Save"
        variant="contained"
        className="mr-2"
        color="primary"
        loading={loading}
      />
      {!loading && <Button text="Cancel" onClick={onCancel} />}
    </form>
  );
};

ProfileInfoForm.propTypes = {
  usuario: PropTypes.object,
  onUsuarioChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ProfileInfoForm;
