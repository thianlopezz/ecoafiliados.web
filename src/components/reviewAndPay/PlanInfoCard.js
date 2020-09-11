import React, { useState } from 'react';
import ImageCard from '../common/cards/ImageCard';
import moment from 'moment';
import Input from '../common/inputs/Input';
import Down from '@material-ui/icons/ArrowDropDown';
import Close from '@material-ui/icons/Close';
import { IconButton, InputAdornment } from '@material-ui/core';

const PlanInfoCard = ({
  plan = {},
  reserva = {},
  showTotalInput,
  total,
  onChangePrecio: onChangeTotal,
  salida = {},
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <ImageCard image={plan.urlFoto} />
          </div>
          <div className="col-12">
            <h5 className="card-title mt-2 mb-0">{plan.plan}</h5>
            <p className="text-muted mb-0">
              {moment(salida.horaFin).diff(moment(salida.horaInicio), 'hour')}H
              duración
            </p>
            {plan.planner && (
              <p className="text-muted">Ofrecido por {plan.planner.agencia}</p>
            )}
          </div>
          <hr className="w-100 mx-2 my-1 mb-3" />
          <div className="col-12">
            <p className="text-muted mb-0">
              {moment(salida.feSalida).format('ddd[,] MMM DD')}
            </p>
            <p className="text-muted">
              {moment(salida.horaInicio).format('hh:mm A')} {' – '}
              {moment(salida.horaFin).format('hh:mm A')}
            </p>
          </div>
          <hr className="w-100 mx-2 my-1 mb-3" />
          {total == undefined && (
            <>
              <div className="col-12">
                <div className="d-flex">
                  <p className="text-muted">
                    ${plan.precio} x {reserva.cupos} pasajero(s)
                  </p>
                  <p className="text-muted ml-auto">
                    {`${plan.precio * reserva.cupos}` || 0}
                  </p>
                </div>
              </div>
              <hr className="w-100 mx-2 my-1 mb-3" />
            </>
          )}
          <div className="col-12">
            {!showTotalInput ? (
              <div className="d-flex">
                <p className="font-weight-bold">Total(USD)</p>
                <p
                  className="font-weight-bold ml-auto"
                  onClick={() => onChangeTotal(plan.precio * reserva.cupos)}
                >
                  ${plan.precio * reserva.cupos}{' '}
                  <IconButton
                    aria-label="go"
                    style={{
                      borderRadius: 'unset',
                      backgroundColor: 'unset',
                    }}
                    className="h-100 ml-auto p-0"
                    size="medium"
                  >
                    <Down fontSize="inherit" />
                  </IconButton>
                </p>
              </div>
            ) : (
              <Input
                type="decimal"
                label="Total"
                name="total"
                value={total}
                onChange={e => {
                  onChangeTotal(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="go"
                      size="medium"
                      onClick={() => {
                        onChangeTotal(undefined);
                      }}
                    >
                      <Close fontSize="inherit" />
                    </IconButton>
                  </InputAdornment>
                }
                error={total == '' && 'Ingresa un valor válido'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanInfoCard;
