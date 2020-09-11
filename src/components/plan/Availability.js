import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/inputs/Button';
import moment from 'moment';

const Availability = ({ nextDate, precio, onChooseDate, onClickFecha }) => {
  let date = moment(nextDate.feSalida);
  let left;

  if (nextDate.ocupados === nextDate.cupos) {
    left = 'No available left.';
  } else {
    left = `${nextDate.cupos - nextDate.ocupados} of ${
      nextDate.cupos
    } spots left.`;
  }

  return (
    <div className="row mt-4">
      <div className="col-md-4 col-sm-12">
        <h2>Availability</h2>
      </div>
      <div className="col-md-8 col-sm-12 pr-0">
        <div className="card border border-dark rounded">
          <div className="card-body">
            <div className="row">
              <div className="col-8">
                <p>
                  {date.format('ddd[,] MMM DD')} | From{' '}
                  {moment(nextDate.horaInicio).format('hh:mm A')} to
                  {moment(nextDate.horaFin).format('hh:mm A')}
                </p>
              </div>
              <div className="col-4 text-right">
                <Button
                  onClick={() => onClickFecha(nextDate)}
                  color="primary"
                  variant="outlined"
                >
                  Choose
                </Button>
              </div>
              <div className="col-12">
                <p className="text-muted mb-0">${precio} per person</p>
                <p className="text-muted mb-0">{left}</p>
              </div>
            </div>
          </div>
          <hr className="w-100 mt-1" />
          <div className="card-footer pt-0 text-right">
            <Button color="primary" onClick={onChooseDate}>
              <i className="fas fa-calendar-day" /> Show more dates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Availability.propTypes = {
  stars: PropTypes.number,
  reviews: PropTypes.array,
};

export default Availability;
