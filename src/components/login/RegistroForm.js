import React, { Component } from 'react';

import Input from '../common/inputs/Input';
import Button from '../common/inputs/Button';
import { email } from '../../helpers/validations';
import Datepicker from '../common/inputs/Datepicker';
import moment from 'moment';

class RegistroForm extends Component {
  state = { user: { feNacimiento: moment() }, errors: {} };

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ errors: {} });

    const { user } = this.state;
    let errors = {};
    let valid = true;

    if (!new RegExp(email).test(user.correo)) {
      valid = false;
      errors = { ...errors, correo: 'A valid email is required' };
    }

    if (!user.nombre || user.nombre.trim() === '') {
      valid = false;
      errors = { ...errors, nombre: 'Name is required' };
    }

    if (!user.apellido || user.apellido.trim() === '') {
      valid = false;
      errors = { ...errors, apellido: 'Last name is required' };
    }

    if (!user.contrasena1 || user.contrasena1 === '') {
      valid = false;
      errors = { ...errors, contrasena1: 'Password is required' };
    }

    if (user.contrasena1 && user.contrasena1.length < 8) {
      valid = false;
      errors = {
        ...errors,
        contrasena1: 'Password must be at least 8 characters long',
      };
    }

    if (user.contrasena1 !== user.contrasena2) {
      valid = false;
      errors = {
        ...errors,
        contrasena1: 'Passwords must match',
        contrasena2: 'Passwords must match',
      };
    }

    if (!user.feNacimiento) {
      valid = false;
      errors = { ...errors, feNacimiento: 'Your date of birth is required' };
    }

    let edad = moment().diff(moment(user.feNacimiento), 'year');

    if (moment().diff(moment(user.feNacimiento), 'year') < 18) {
      valid = false;
      errors = { ...errors, feNacimiento: 'You need to be at least 18' };
    }

    if (!valid) {
      this.setState({ errors });
      return;
    }

    this.props.onSubmit(user);
  }

  onInputChange(e) {
    let { user } = this.state;

    if (e.target) {
      user[e.target.name] = e.target.value;
    } else {
      user['feNacimiento'] = e.toDate();
    }

    this.setState({ user: { ...user } });
  }

  render() {
    const { user, errors } = this.state;
    const { loading } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <Input
          label="Email"
          name="correo"
          value={user.correo}
          onChange={this.onInputChange}
          error={errors.correo}
        />
        <Input
          label="Name"
          name="nombre"
          value={user.nombre}
          onChange={this.onInputChange}
          error={errors.nombre}
        />
        <Input
          label="Last name"
          name="apellido"
          value={user.apellido}
          onChange={this.onInputChange}
          error={errors.apellido}
        />
        <Input
          type="password"
          label="Password"
          name="contrasena1"
          value={user.contrasena1}
          onChange={this.onInputChange}
          error={errors.contrasena1}
        />
        <Input
          type="password"
          label="Repeat password"
          name="contrasena2"
          value={user.contrasena2}
          onChange={this.onInputChange}
          error={errors.contrasena2}
        />
        <Datepicker
          label="Date of birth"
          name="feNacimiento"
          variant="inline"
          value={user.feNacimiento}
          onChange={this.onInputChange}
          error={errors.feNacimiento}
        />
        <Button
          type="submit"
          text="Register"
          className="btn btn-block"
          loading={loading}
        />
      </form>
    );
  }
}

export default RegistroForm;
