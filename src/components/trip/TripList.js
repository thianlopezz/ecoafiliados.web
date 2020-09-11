import React from 'react';
import TripCard from './TripCard';
import DummyCards from '../common/cards/DummyCards';

const TripList = ({ loading, trips = [], onTripClick }) => {
  if (loading) {
    return (
      <div className="card w-100">
        <DummyCards />
      </div>
    );
  }

  if (!loading && trips.length == 0) {
    return (
      <div className="card w-100">
        <div className="card-body">
          <h1 className="text-center">
            <i className="far fa-sticky-note" />
          </h1>
          <p className="text-center">You have no trips comming</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      {trips.map(trip => (
        <div key={trip.idPlan} className="col-sm-12 col-md-4">
          <TripCard trip={trip} onTripClick={onTripClick} />
        </div>
      ))}
    </div>
  );
};

export default TripList;
