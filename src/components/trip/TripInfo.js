import React from 'react';
import moment from 'moment';
import PlanShortInfoItem from '../plan/PlanShortInfoItem';
import Button from '../common/inputs/Button';
import Right from '@material-ui/icons/ChevronRight';
import { IconButton } from '@material-ui/core';

const TripInfo = ({ trip, onDelete, disableDelete, onReservas }) => {
  return (
    <div className="w-100">
      <h4>Plan</h4>
      {/* <p>{`${usuario.nombre} ${usuario.apellido}`}</p> */}
      <PlanShortInfoItem {...trip} descripcion={trip.descripcion} />
      <div
        className="d-flex"
        style={{ cursor: onReservas ? 'pointer' : 'unset' }}
        onClick={onReservas ? () => onReservas(trip.idSalida) : null}
      >
        <h6>
          {trip.ocupados}/{trip.cupos} reservados
        </h6>
        {onReservas && (
          <IconButton
            aria-label="go"
            style={{ borderRadius: 'unset', backgroundColor: 'unset' }}
            className="h-100 ml-auto p-0"
            size="medium"
          >
            <Right fontSize="inherit" />
          </IconButton>
        )}
      </div>
      <hr className="w-100 my-3"></hr>
      <div className="row m-0 p-0">
        <div className="col-6 m-0 p-0">
          <h5>Precio</h5>
          <p>${trip.precio}</p>
        </div>
        <div className="col-6 m-0 p-0">
          <h5>Cupos</h5>
          <p>{trip.cupos}</p>
        </div>
      </div>
      <hr className="w-100 my-3"></hr>
      <div className="row m-0 p-0">
        <div className="col-6 m-0 p-0">
          <h5>Desde</h5>
          <p>{moment(trip.horaInicio).format('hh:mm A')}</p>
        </div>
        <div className="col-6 m-0 p-0">
          <h5>Hasta</h5>
          <p>{moment(trip.horaFin).format('hh:mm A')}</p>
        </div>
      </div>
      {onDelete && (
        <>
          <hr className="w-100 my-3"></hr>
          <div className="row m-0 p-0">
            <div className="col-12 p-0 m-0">
              <Button
                color="secondary"
                className="btn btn-block"
                disabled={disableDelete}
                onClick={onDelete}
              >
                Eliminar del calendario
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TripInfo;
