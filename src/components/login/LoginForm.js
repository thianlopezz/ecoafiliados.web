import React, { Component } from 'react';

import Input from '../common/inputs/Input';
import Button from '../common/inputs/Button';

class LoginForm extends Component {
  state = { login: {}, errors: {} };

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ errors: {} });

    const { login } = this.state;
    let errors = {};
    let valid = true;

    if (!login.usuario || login.usuario.trim() === '') {
      valid = false;
      errors = { ...errors, usuario: 'El usuario es requerido' };
    }

    if (!login.contrasena || login.contrasena.trim() === '') {
      valid = false;
      errors = { ...errors, contrasena: 'La contraseña es requerida' };
    }

    if (!valid) {
      this.setState({ errors });
      return;
    }

    this.props.onSubmit(login);
  }

  onInputChange(e) {
    let { login } = this.state;
    login[e.target.name] = e.target.value;
    this.setState({ login });
  }

  render() {
    const { login, errors } = this.state;
    const { loading } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <Input
          label="Usuario"
          name="usuario"
          value={login.usuario}
          onChange={this.onInputChange}
          error={errors.usuario}
        />
        <Input
          type="password"
          label="Contraseña"
          name="contrasena"
          value={login.contrasena}
          onChange={this.onInputChange}
          error={errors.contrasena}
        />
        <Button
          type="submit"
          text="Login"
          className="btn btn-block"
          loading={loading}
        />
      </form>
    );
  }
}

export default LoginForm;
