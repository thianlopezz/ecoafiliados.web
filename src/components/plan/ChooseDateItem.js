import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../common/inputs/Button';

const ChooseDateItem = ({
  idSalida,
  feSalida,
  horaInicio,
  horaFin,
  ocupados,
  cupos,
  onClickFecha,
}) => {
  let left;
  let avalible;

  if (ocupados === cupos) {
    left = 'No available left.';
    avalible = false;
  } else {
    left = `${cupos - ocupados} of ${cupos} spots left.`;
    avalible = true;
  }

  return (
    <div className="w-100 mb-4">
      <h3 className="mb-1">{moment(feSalida).format('ddd[,] DD MMM YYYY')}</h3>
      <hr className="w-100"></hr>
      <div className="row">
        <div className="col">
          <p className="mb-1">
            {moment(horaInicio).format('hh:mm A')} {' - '}
            {moment(horaFin).format('hh:mm A')}
          </p>
          <p>{left}</p>
        </div>
        {onClickFecha && (
          <div className="col m-auto text-center">
            <Button
              color="primary"
              variant="contained"
              onClick={() => onClickFecha({ idSalida, fecha: feSalida })}
              disabled={!avalible}
            >
              Choose
            </Button>
          </div>
        )}
      </div>
      <hr className="w-100"></hr>
    </div>
  );
};

ChooseDateItem.propTypes = {
  fecha: PropTypes.string,
  horaInicio: PropTypes.string,
  horaFin: PropTypes.string,
  ocupados: PropTypes.number,
  cupos: PropTypes.number,
};

export default ChooseDateItem;
