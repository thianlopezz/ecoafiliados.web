import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../common/inputs/Button';
import MultipleSelect from '../common/inputs/MultipleSelect';
import Section from '../common/wrappers/Section';

class IncluidosForm extends Component {
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

    // if (!plan.plan || plan.plan.trim() === '') {
    //   valid = false;
    //   errors = { ...errors, plan: 'The name of the plan is required' };
    // }

    if (!valid) {
      this.setState({ errors });
      return;
    }

    this.props.onSubmit(plan);
  }

  onChange(value) {
    if (!value) {
      value = [];
    }

    let { plan, onPlanChange } = this.props;

    plan['incluidos'] = value.map(incluido => {
      return { idIncluido: incluido.value, incluido: incluido.label };
    });
    onPlanChange(plan);
  }

  onChangeNumbers(e, name) {
    let { plan, onPlanChange } = this.props;

    plan[name] = e.target.value;
    onPlanChange(plan);
  }

  render() {
    const { errors } = this.state;
    const { loading, plan, incluidosOption } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <Section style={{ marginBottom: '4rem' }}>
          <h2>Agrega detalles de lo que incluye tu plan</h2>
          <p>
            Puedes ofrecer comida y bebidas, equipo especial, o cualquier cosa
            que haga que tus pasajeros se sientan cómodos.
          </p>
          <MultipleSelect
            closeMenuOnSelect={false}
            className="mt-2"
            label="Incluye"
            name="incluidos"
            value={(() => {
              if (plan.incluidos) {
                return plan.incluidos.map(incluido => {
                  return {
                    value: incluido.idIncluido,
                    label: incluido.incluido,
                  };
                });
              }
              return [];
            })()}
            groupedOptions={incluidosOption}
            onChange={this.onChange}
            error={errors.incluidos}
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

IncluidosForm.propTypes = {
  plan: PropTypes.object,
  onPlanChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default IncluidosForm;
