import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../common/inputs/Input';
import Button from '../common/inputs/Button';

import { email, phone } from '../../helpers/validations';

class BasicInfoForm extends Component {
  state = { center: { lat: -0.3830876, lng: -90.983792 }, errors: {} };

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ errors: {} });

    const { planner } = this.props;
    let errors = {};
    let valid = true;

    if (!planner.agencia || planner.agencia.trim() === '') {
      valid = false;
      errors = { ...errors, agencia: 'The name of the agency is required' };
    }

    if (!planner.about || planner.about.trim() === '') {
      valid = false;
      errors = { ...errors, about: 'Tell something about your agency.' };
    }

    if (!new RegExp(email).test(planner.correo)) {
      valid = false;
      errors = { ...errors, correo: 'A valid email is required' };
    }

    if (!new RegExp(phone).test(planner.contacto)) {
      valid = false;
      errors = { ...errors, contacto: 'A valid phone number is required' };
    }

    if (!valid) {
      this.setState({ errors });
      return;
    }

    this.props.onSubmit(planner);
  }

  onChange(e) {
    let { planner, onPlannerChange } = this.props;

    planner[e.target.name] = e.target.value;
    onPlannerChange(planner);
  }

  render() {
    const { errors } = this.state;
    const { loading, planner } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <Input
          label="Agency name"
          name="agencia"
          value={planner.agencia}
          onChange={this.onChange}
          error={errors.agencia}
        />
        <Input
          label="About"
          name="about"
          placeholder="Tell something that defines the soul of your agency"
          multiline={true}
          rows={3}
          value={planner.about}
          onChange={this.onChange}
          error={errors.about}
        />
        <div className="row form-group">
          <div className="col-md-6 col-sm-12">
            <Input
              label="Email bussiness"
              name="correo"
              value={planner.correo}
              onChange={this.onChange}
              error={errors.correo}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <Input
              label="Contact number"
              name="contacto"
              value={planner.contacto}
              onChange={this.onChange}
              error={errors.contacto}
            />
          </div>
        </div>
        <Button
          type="submit"
          text="Save"
          variant="contained"
          className="mr-2"
          color="primary"
          loading={loading}
        />
      </form>
    );
  }
}

BasicInfoForm.propTypes = {
  planner: PropTypes.object,
  onPlannerChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default BasicInfoForm;
