import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../common/inputs/Input';
import Button from '../common/inputs/Button';

import Section from '../common/wrappers/Section';

class BasicInfoForm extends Component {
  state = { errors: {} };

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ errors: {} });

    const { plan } = this.props;
    let errors = {};
    let valid = true;

    if (!plan.plan || plan.plan.trim() === '') {
      valid = false;
      errors = { ...errors, plan: 'The name of the plan is required' };
    }

    if (!plan.descripcion || plan.descripcion.trim() === '') {
      valid = false;
      errors = {
        ...errors,
        descripcion: 'The description of the plan is required',
      };
    }

    if (!plan.cupos || Number(plan.cupos) === 0) {
      valid = false;
      errors = {
        ...errors,
        cupos: 'The group size of the plan is required',
      };
    }

    if (!plan.precio || Number(plan.precio) === 0) {
      valid = false;
      errors = {
        ...errors,
        precio: 'The price of the plan is required',
      };
    }

    if (!valid) {
      this.setState({ errors });
      return;
    }

    this.props.onSubmit(plan);
  }

  onChange(e) {
    let { plan, onPlanChange } = this.props;

    plan[e.target.name] = e.target.value;
    onPlanChange(plan);
  }

  onChangeNumbers(e, name) {
    let { plan, onPlanChange } = this.props;

    plan[name] = e.target.value;
    onPlanChange(plan);
  }

  render() {
    const { errors } = this.state;
    const { loading, plan } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <Section
          title="Dale un nombre a tu plan"
          description="Hazlo corto, descriptivo y emocionante."
          style={{ marginBottom: '4rem' }}
        >
          <Input
            label="Nombre del plan"
            name="plan"
            value={plan.plan}
            onChange={this.onChange}
            error={errors.plan}
          />
        </Section>
        <Section
          title="Haz un pequeño resumen de lo que harás"
          description="Describe el plan desde principio a fin, trata de explicar las
            actividades que se realizarán."
          style={{ marginBottom: '4rem' }}
        >
          <Input
            label="Descripción"
            name="descripcion"
            multiline={true}
            rows={3}
            value={plan.descripcion}
            onChange={this.onChange}
            error={errors.descripcion}
          />
        </Section>
        <Section
          title="Máximo tamaño del grupo"
          description="Piensa en el tamaño del grupo con el que puedas trabajar mejor."
          style={{ marginBottom: '4rem' }}
        >
          <Input
            type="integer"
            label="Tamaño de grupo"
            name="cupos"
            value={plan.cupos}
            onChange={e => this.onChangeNumbers(e, 'cupos')}
            error={errors.cupos}
          />
        </Section>
        <Section
          title="Configura el precio por pasajero"
          description="El precio de tu plan lo pones tu, según la conveniencia de tu
            negocio."
          style={{ marginBottom: '4rem' }}
        >
          <Input
            type="decimal"
            label="Precio por pasajero"
            name="precio"
            value={plan.precio}
            onChange={e => this.onChangeNumbers(e, 'precio')}
            error={errors.precio}
          />
        </Section>
        <Button
          type="submit"
          text="Guardar"
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
  plan: PropTypes.object,
  onPlanChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default BasicInfoForm;
