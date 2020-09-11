import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../common/inputs/Button';
import styled from 'styled-components';
import Right from '@material-ui/icons/ChevronRight';

import { MEDIA_SCREENS, CSS_HELPERS_REACT } from '../../theme';
import { IconButton, Slider } from '@material-ui/core';
import Range from '../common/inputs/Range';
import DummyCards from '../common/cards/DummyCards';

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 25,
    label: '25%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
  },
];

function valuetext(value) {
  return `${value}%`;
}

const TripShortInfoItem = ({
  loading,
  idSalida,
  plan,
  urlFoto,
  feSalida,
  horaInicio,
  horaFin,
  cupos,
  ocupados,
  onClick,
  onDetail,
  onSeeReservations,
  showOccupationSlide = false,
}) => {
  let left;

  if (ocupados >= cupos) {
    left = 'Todos los cupos llenos.';
  } else {
    left = `${ocupados} de ${cupos} reservados.`;
  }

  let cursorStyle;
  if (onClick) {
    cursorStyle = { cursor: 'pointer' };
  }

  return (
    <div className="w-100 mb-4">
      {loading ? (
        <DummyCards size={1} cols="col-12" disablePhoto />
      ) : (
        <div
          className="d-flex"
          style={cursorStyle}
          onClick={() => onClick && onClick({ idSalida, fecha: feSalida })}
        >
          <div className="col-3">
            <Image src={urlFoto} draggable="false" />
          </div>
          <div className="col">
            <h6 style={CSS_HELPERS_REACT.TRUNCATE}> {plan}</h6>
            <p className="mb-1">{moment(feSalida).format('ddd[,] MMM DD')}</p>
            <p className="mb-1">
              {moment(horaInicio).format('hh:mm A')} {' - '}
              {moment(horaFin).format('hh:mm A')}
            </p>
            <p>{left}</p>
            {showOccupationSlide && (
              <Range
                className="mb-0"
                value={+Number((ocupados / cupos) * 100).toFixed(1)}
                getAriaValueText={valuetext}
                step={5}
                marks={marks}
                valueLabelDisplay="auto"
              />
            )}
            {onDetail && (
              <Button
                color="primary"
                onClick={() => onDetail({ idSalida, fecha: feSalida })}
              >
                Detalles
              </Button>
            )}
            {onSeeReservations && (
              <Button
                color="primary"
                onClick={() => onSeeReservations(idSalida)}
              >
                Ver reservas
              </Button>
            )}
          </div>
          {onClick && (
            <div className="ml-auto">
              <IconButton
                aria-label="go"
                style={{ borderRadius: 'unset', backgroundColor: 'unset' }}
                className="h-100"
                size="medium"
              >
                <Right fontSize="inherit" />
              </IconButton>
            </div>
          )}
        </div>
      )}
      <hr className="w-100"></hr>
    </div>
  );
};

TripShortInfoItem.propTypes = {
  idSalida: PropTypes.number,
  plan: PropTypes.string,
  urlFoto: PropTypes.string,
  feSalida: PropTypes.oneOf([PropTypes.object, PropTypes.string]),
  horaInicio: PropTypes.oneOf([PropTypes.object, PropTypes.string]),
  horaFin: PropTypes.oneOf([PropTypes.object, PropTypes.string]),
  pasajeros: PropTypes.array,
  cupos: PropTypes.number,
  onClick: PropTypes.func,
};

export default TripShortInfoItem;

const Image = styled.img`
  border-radius: 0.3em;

  @media only screen and (min-width: ${MEDIA_SCREENS.MEDIUM.FROM +
      'px'}) and (max-width: ${MEDIA_SCREENS.MEDIUM.TO + 'px'}) {
    src: url(${props => props.src});
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  @media only screen and (min-width: ${MEDIA_SCREENS.SMALL.FROM +
      'px'}) and (max-width: ${MEDIA_SCREENS.SMALL.TO + 'px'}) {
    src: url(${props => props.src});
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;
