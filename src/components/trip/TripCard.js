import React from 'react';
import ImageCard from '../common/cards/ImageCard';
import moment from 'moment';
import { Link } from 'react-router-dom';

const TripCard = ({ trip, onTripClick }) => {
  const { urlFoto, plan, ciudad, feSalida, detailText = 'Show details' } = trip;

  return (
    <div onClick={() => onTripClick(trip)} className="w-100">
      {ciudad && <h2 className="mb-3">{ciudad}</h2>}
      <ImageCard
        image={urlFoto}
        title={plan}
        subtitle={moment(feSalida).format('DD MMM YYYY')}
      />
      <p>
        <Link to="#">{detailText}</Link>
      </p>
    </div>
  );
};

export default TripCard;
