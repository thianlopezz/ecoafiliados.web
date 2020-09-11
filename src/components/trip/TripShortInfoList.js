import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../common/inputs/Button';
import TripShortInfoItem from './TripShortInfoItem';
import DummyCards from '../common/cards/DummyCards';

const TripShortInfoList = ({
  loading,
  trips,
  onClickTrip,
  onNewTrip,
  onClickDetail,
  onClickSeeReservation,
  showOccupationSlide,
}) => {
  return (
    <div className="row p-0 m-0">
      {trips.length > 0
        ? trips.map(trip => (
            <div key={trip.idSalida} className="col-12 p-0 m-0">
              <TripShortInfoItem
                {...trip}
                feSalida={trip.feSalida}
                onClick={onClickTrip}
                onDetail={onClickDetail}
                onSeeReservations={onClickSeeReservation}
                showOccupationSlide={showOccupationSlide}
              />
            </div>
          ))
        : !loading && (
            <>
              <p>No tienes viajes planificados para este día.</p>
              <hr className="w-100"></hr>
            </>
          )}
      {loading && (
        <div className="col-12 p-0 m-0">
          <DummyCards size={1} cols="col-12" disablePhoto />
        </div>
      )}
      {onNewTrip && (
        <div className="col-12 p-0 m-0">
          <Button onClick={onNewTrip} className="btn btn-block">
            Agregar una nueva disponibiliad
          </Button>
        </div>
      )}
    </div>
  );
};

TripShortInfoItem.propTypes = {
  date: PropTypes.object,
  trips: PropTypes.array,
  onClickTrip: PropTypes.func,
  onNewTrip: PropTypes.func,
};

export default TripShortInfoList;
