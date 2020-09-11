import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../common/inputs/Button';
import MultipleSelect from '../common/inputs/MultipleSelect';
import Section from '../common/wrappers/Section';

class ActividadesForm extends Component {
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

    if (!plan.actividades || plan.actividades.length === 0) {
      valid = false;
      errors = {
        ...errors,
        actividades: 'You must specify at least one activity.',
      };
    }

    if (!valid) {
      this.setState({ errors });
      return;
    }

    this.props.onSubmit({ idPlan: plan.idPlan, actividades: plan.actividades });
  }

  onChange(value) {
    if (!value) {
      value = [];
    }

    let { plan, onPlanChange } = this.props;

    plan['actividades'] = value.map(actividad => {
      return { idActividad: actividad.value, actividad: actividad.label };
    });
    onPlanChange(plan);
  }

  render() {
    const { errors } = this.state;
    const { loading, plan, actividadesOption } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <Section
          title="¿Qué harás?"
          description="Elige las actividades que se podrán relizar en tu plan."
          style={{ marginBottom: '4rem' }}
        >
          <MultipleSelect
            closeMenuOnSelect={false}
            className="mt-2"
            label="Actividades"
            name="actividades"
            value={(() => {
              if (plan.actividades) {
                return plan.actividades.map(actividad => {
                  return {
                    value: actividad.idActividad,
                    label: actividad.actividad,
                  };
                });
              }
              return [];
            })()}
            options={actividadesOption}
            onChange={this.onChange}
            error={errors.actividades}
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

ActividadesForm.propTypes = {
  plan: PropTypes.object,
  onPlanChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ActividadesForm;
