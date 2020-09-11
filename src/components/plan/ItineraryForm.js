import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../common/inputs/Button';

import Timepicker from '../common/inputs/Timepicker';
import MultipleSelect from '../common/inputs/MultipleSelect';
import { FormHelperText } from '@material-ui/core';
import moment from 'moment';
import Section from '../common/wrappers/Section';

const calcularTiempoPromedio = (itinerario = []) => {
  if (itinerario.length == 0) return 0;

  let sum = 0;
  itinerario.forEach(itinerarioItem => {
    let horaIni = moment(itinerarioItem.horaInicio);
    let horaFin = moment(itinerarioItem.horaFin);
    sum += horaFin.diff(horaIni, 'hours', true);
  });

  return sum / itinerario.length;
};

class ItineraryForm extends Component {
  state = { errors: {} };

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onChageTime = this.onChageTime.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ errors: {} });

    const { plan } = this.props;
    let errors = {};
    let valid = true;

    if (!plan.itinerario || plan.itinerario.length === 0) {
      valid = false;
      errors = { ...errors, itinerario: 'Select almost one day' };

      this.setState({ errors });
      return;
    }

    errors.itinerarioList = plan.itinerario.map(itinerario => {
      let error;

      if (
        moment(itinerario.horaInicio).isSameOrAfter(moment(itinerario.horaFin))
      ) {
        error = 'The start time should be erlier than the end time';
      }

      return error;
    });

    if (errors.itinerarioList.find(error => error !== undefined)) {
      valid = false;
    }

    if (!valid) {
      this.setState({ errors });
      return;
    }

    let duracion = plan.duracion || calcularTiempoPromedio(plan.itinerario);

    let itinerario = plan.itinerario.map(itinerario => {
      return {
        ...itinerario,
        horaInicio: moment(itinerario.horaInicio).format('YYYY-MM-DD HH:mm'),
        horaFin: moment(itinerario.horaFin).format('YYYY-MM-DD HH:mm'),
      };
    });

    this.props.onSubmit({ idPlan: plan.idPlan, duracion, itinerario });
  }

  onChangeSelect(value) {
    if (!value) {
      value = [];
    }

    let { plan, diasOption, onPlanChange } = this.props;

    let itinerario = value.map(day => {
      return {
        idDia: day.value,
        dia: day.label,
        horaInicio: moment(),
        horaFin: moment(),
        orden: diasOption.findIndex(dia => dia.value == day.value),
      };
    });

    plan['itinerario'] = itinerario.sort((a, b) => a.orden - b.orden);
    onPlanChange(plan);
  }

  onChageTime(time, tipo, index) {
    let { plan, onPlanChange } = this.props;
    plan.itinerario[index][tipo] = time;

    let promedioDuracion = calcularTiempoPromedio(plan.itinerario);
    plan.duracion = promedioDuracion.toFixed(2);
    onPlanChange(plan);
  }

  render() {
    const { errors } = this.state;
    const { loading, plan, diasOption } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <Section style={{ marginBottom: '4rem' }}>
          <h2>What days you offer this plan?</h2>
          <p>
            You choose the days you can offer this plan. Give details of the
            itinerary you have planned for your guests.
          </p>
        </Section>
        <MultipleSelect
          className="mt-2"
          label="Days"
          name="itinerario"
          value={(() => {
            if (plan.itinerario) {
              return plan.itinerario.map(itinerario => {
                return { value: itinerario.idDia, label: itinerario.dia };
              });
            }
            return [];
          })()}
          options={diasOption}
          onChange={this.onChangeSelect}
          error={errors.itinerario}
        />
        {plan.duracion && (
          <div className="row">
            <div className="col-12 text-right">
              <span className="badge badge-pill badge-info p-2">
                Average time {plan.duracion}H
              </span>
            </div>
          </div>
        )}
        {plan.itinerario &&
          plan.itinerario.map((itinerario, index) => (
            <div key={itinerario.idDia} className="row form-group">
              <div className="col-md-2 col-sm-12 my-auto">
                <h3>{itinerario.idDia}</h3>
              </div>
              <div className="col-md-5 col-sm-12">
                <Timepicker
                  label="From"
                  name={`horaInicio${index}`}
                  variant="inline"
                  value={plan.itinerario[index].horaInicio}
                  onChange={time => this.onChageTime(time, 'horaInicio', index)}
                  error={errors.horaInicio}
                />
              </div>
              <div className="col-md-5 col-sm-12">
                <Timepicker
                  label="To"
                  name={`horaFin${index}`}
                  variant="inline"
                  value={plan.itinerario[index].horaFin}
                  onChange={time => this.onChageTime(time, 'horaFin', index)}
                  error={errors.horaFin}
                />
              </div>
              {errors.itinerarioList && errors.itinerarioList[index] && (
                <div className="col-12">
                  <FormHelperText error>
                    {errors.itinerarioList[index]}
                  </FormHelperText>
                </div>
              )}
            </div>
          ))}
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

ItineraryForm.propTypes = {
  plan: PropTypes.object,
  onPlanChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ItineraryForm;
