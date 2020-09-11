import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../common/inputs/Button';
import MultipleSelect from '../common/inputs/MultipleSelect';
import LugaresList from '../lugar/LugarList';
import Section from '../common/wrappers/Section';

class LugaresForm extends Component {
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

    if (!plan.lugares || plan.lugares.length === 0) {
      valid = false;
      errors = { ...errors, lugares: 'You must select almost one place' };
    }

    if (!valid) {
      this.setState({ errors });
      return;
    }

    this.props.onSubmit({ idPlan: plan.idPlan, lugares: plan.lugares });
  }

  onChange(value) {
    if (!value) {
      value = [];
    }

    let { plan, onPlanChange } = this.props;

    plan['lugares'] = value.map(lugar => {
      return { idLugar: lugar.value, lugar: lugar.label };
    });
    onPlanChange(plan);
  }

  render() {
    const { errors } = this.state;
    const { loading, plan, lugaresOption, lugares } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <Section
          title="¿En dónde estaremos?"
          description="Elige los luagares a los que vas a estar durante tu plan."
          style={{ marginBottom: '4rem' }}
        >
          <MultipleSelect
            closeMenuOnSelect={false}
            className="mt-2"
            label="En donde estaremos"
            name="lugares"
            value={(() => {
              if (plan.lugares) {
                return plan.lugares.map(lugar => {
                  return { value: lugar.idLugar, label: lugar.lugar };
                });
              }
              return [];
            })()}
            groupedOptions={lugaresOption}
            onChange={this.onChange}
            error={errors.lugares}
          />
          <LugaresList
            cols="col-md-6 col-sm-12"
            lugares={lugares.filter(
              lugar =>
                plan.lugares &&
                plan.lugares.find(
                  lugarSelected => lugar.idLugar == lugarSelected.idLugar
                )
            )}
            horizontal={true}
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

LugaresForm.propTypes = {
  plan: PropTypes.object,
  onPlanChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default LugaresForm;
