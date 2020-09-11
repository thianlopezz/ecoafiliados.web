import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Input from '../common/inputs/Input';
import Button from '../common/inputs/Button';
import Select from '../common/inputs/Select';
import Timepicker from '../common/inputs/Timepicker';
import moment from 'moment';
import TripShortInfoItem from './TripShortInfoItem';
import PlanShortInfoItem from '../plan/PlanShortInfoItem';
import { FormHelperText } from '@material-ui/core';
import MultipleSelect from '../common/inputs/MultipleSelect';
import Datepicker from '../common/inputs/Datepicker';

// 20 por default
const generateNumberOptions = plan => {
  let numberOptions = [];
  for (let i = 0; i < plan.cupos + 10; i++) {
    if (i + 1 == plan.cupos) {
      numberOptions.push({ text: `${i + 1} (Por defecto)`, value: i + 1 });
    } else {
      numberOptions.push({ text: i + 1, value: i + 1 });
    }
  }

  return numberOptions;
};

const TripForm = ({
  loading,
  trip,
  date,
  onSubmit,
  onTripChange,
  planes,
  planOptions,
  diasOption,
  onCancel,
}) => {
  const [errors, setErrors] = useState({});
  const [planSelected, setPlanSelected] = useState({});

  useEffect(() => {
    if (trip && trip.idSalida) {
      let plan = planes.find(plan => plan.idPlan == trip.idPlan);
      setPlanSelected(plan);
    }
  });

  const _onSubmit = e => {
    e.preventDefault();
    setErrors({});

    let errors = {};
    let valid = true;

    if (!trip.idPlan) {
      valid = false;
      errors = {
        ...errors,
        idPlan: 'Elige el plan que vas a poner a disposición',
      };
    }

    if (!trip.cupos) {
      valid = false;
      errors = { ...errors, cupos: 'Elige de cupos para este viaje' };
    }

    if (moment(trip.horaFin).diff(moment(trip.horaInicio), 'hour', true) <= 1) {
      valid = false;
      errors = {
        ...errors,
        horario: 'Debe haber al menos una hora de diferencia.',
      };
    }

    if (trip.idSalida && (!trip.precio || Number(trip.precio) === 0)) {
      valid = false;
      errors = {
        ...errors,
        precio: 'Ingresa un precio válido.',
      };
    }

    if (trip.seRepite) {
      if (!trip.dias || trip.dias.length == 0) {
        valid = false;
        errors = {
          ...errors,
          dias: 'Selecciona al menos un día.',
        };
      }

      if (!trip.feHasta) {
        valid = false;
        errors = {
          ...errors,
          feHasta: 'Selecciona una fecha válida.',
        };
      }

      if (moment(date).isSameOrAfter(trip.feHasta)) {
        valid = false;
        errors = {
          ...errors,
          feHasta:
            'La fecha de finalización debe ser mayor a la fecha de incio.',
        };
      }
    }

    if (!valid) {
      setErrors(errors);
      return;
    }

    onSubmit({
      ...trip,
      fecha: moment(date).format('YYYY-MM-DD'),
      horaInicio: moment(trip.horaInicio).format('YYYY-MM-DD HH:mm'),
      horaFin: moment(trip.horaFin).format('YYYY-MM-DD HH:mm'),
      idDia: moment(date)
        .format('ddd')
        .toUpperCase(),
      precio: trip.precio || planSelected.precio,
    });
  };

  const onChange = e => {
    trip[e.target.name] = e.target.value;
    onTripChange(trip);
  };

  const onChangeDaySalect = value => {
    if (!value) {
      value = [];
    }

    trip['dias'] = value.map(actividad => {
      return { idDia: actividad.value, dia: actividad.label };
    });
    onTripChange(trip);
  };

  const onChangeFeHasta = e => {
    trip['feHasta'] = e.toDate();
    onTripChange(trip);
  };

  const _onChangePlan = e => {
    trip[e.target.name] = e.target.value;
    let plan = planes.find(plan => plan.idPlan == trip.idPlan);

    onTripChange({ ...trip, cupos: plan.cupos });
    setPlanSelected(plan);
  };

  const onChageTime = (time, name) => {
    trip[name] = moment(time);
    onTripChange(trip);
  };

  let numberOptions = generateNumberOptions(planSelected);

  return (
    <form onSubmit={_onSubmit} noValidate>
      <h2>{moment(date).format('ddd[,] DD MMM YYYY')}</h2>
      <hr></hr>
      {!trip ||
        (!trip.idSalida && (
          <>
            <h3>Elige el plan</h3>
            <p className="mb-2">
              Elige entre las ofertas de planes que posees.
            </p>
          </>
        ))}
      {!trip ||
        (!trip.idSalida && (
          <Select
            className="mt-2"
            label="Plan"
            name="idPlan"
            variant="outlined"
            disabled={trip && trip.idSalida}
            value={trip.idPlan}
            options={planOptions}
            onChange={_onChangePlan}
            error={errors.idPlan}
          />
        ))}
      {planSelected.idPlan && <PlanShortInfoItem {...planSelected} />}

      <h3>Información del viaje</h3>
      <p className="mb-2">
        Confirma la información del nuevo que vas a agendar.
      </p>
      <Select
        label="Cupos disponibles"
        name="cupos"
        variant="outlined"
        value={trip.cupos}
        options={numberOptions}
        onChange={onChange}
        error={errors.cupos}
      />
      {trip &&
        (trip.idSalida && (
          <Input
            type="decimal"
            label="Precio por persona"
            variant="outlined"
            name="precio"
            value={trip.precio}
            onChange={e =>
              onChange({ target: { ...e.target, name: 'precio' } })
            }
            error={errors.precio}
          />
        ))}
      <div className="row mb-3">
        <div className="col-md-6 col-sm-12">
          <Timepicker
            label="Desde"
            name={'horaInicio'}
            variant="inline"
            inputVariant="outlined"
            value={trip.horaInicio}
            onChange={time => onChageTime(time, 'horaInicio')}
            error={errors.horaInicio}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <Timepicker
            label="Hasta"
            name={`horaFin`}
            variant="inline"
            inputVariant="outlined"
            value={trip.horaFin}
            onChange={time => onChageTime(time, 'horaFin')}
            error={errors.horaFin}
          />
        </div>
        {errors.horario && (
          <div className="col-12">
            <FormHelperText error className="mt-0">
              {errors.horario}
            </FormHelperText>
          </div>
        )}
      </div>
      {!trip.idSalida && (
        <Select
          label="Repetir disponibilidad"
          name="seRepite"
          variant="outlined"
          value={trip.seRepite}
          options={[
            { value: 0, text: 'No se repite' },
            { value: 1, text: 'Se repite' },
          ]}
          onChange={onChange}
          error={errors.seRepite}
        />
      )}
      {trip.seRepite == 1 && (
        <div className="row mb-2">
          <div className="col-12">
            <MultipleSelect
              closeMenuOnSelect={false}
              className="mt-2"
              label="Dias"
              name="dias"
              value={(() => {
                if (trip.dias) {
                  return trip.dias.map(dia => {
                    return { value: dia.idDia, label: dia.dia };
                  });
                }
                return [];
              })()}
              options={diasOption}
              onChange={onChangeDaySalect}
              error={errors.dias}
            />
          </div>
          <div className="col-12">
            <Datepicker
              disablePast
              label="Repetir hasta"
              name="feHasta"
              variant="inline"
              value={trip.feHasta}
              onChange={onChangeFeHasta}
              error={errors.feHasta}
            />
          </div>
          {trip.dias && trip.dias.length > 0 && (
            <div className="col-12">
              <p>
                Se va a generar la disponibilidad los dias:{' '}
                <strong>{trip.dias.map(dia => dia.dia).join(', ')}</strong>
              </p>
              <p>
                Desde:{' '}
                <strong>{moment(date).format('ddd[,] DD MMM YYYY')}</strong>
              </p>
              <p>
                Hasta:{' '}
                <strong>
                  {moment(trip.feHasta).format('ddd[,] DD MMM YYYY')}
                </strong>
              </p>
            </div>
          )}
        </div>
      )}
      <Button
        type="submit"
        text="Guardar"
        variant="contained"
        className="mr-2"
        color="primary"
        loading={loading}
      />
      {!loading && <Button text="Cancelar" onClick={onCancel} />}
    </form>
  );
};

TripForm.propTypes = {
  trip: PropTypes.object,
  onTripChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default TripForm;
