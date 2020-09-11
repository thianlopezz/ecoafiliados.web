import React, { useState } from 'react';
import FullModal from '../common/modals/FullModal';
import MapContainer from '../common/MapContainer';
import moment from 'moment';
import ImageCard from '../common/cards/ImageCard';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MEDIA_SCREENS } from '../../theme';
import ReservationPage from '../../pages/planner/reservation/ReservationPage';

export default function TripReservationsModal({ isOpen, trip, onClose }) {
  const {
    idPlan,
    acompanantes,
    feSalida,
    urlFoto,
    plan,
    ciudad,
    descripcion,
    latitud,
    longitud,
    horaInicio,
    horaSalida,
  } = trip;

  return (
    <FullModal isOpen={isOpen} onClose={onClose}>
      <div className="row p-0 m-0">
        <Detalle className="col-sm-12 col-md-3">
          <h1 className="mt-4 mb-0">{moment(feSalida).format('dddd')}</h1>
          <p className="mb-1">{moment(horaInicio).format('DD MMM YYYY')}</p>
          <p>{`${moment(horaSalida).format('HH:mm A')} - ${moment(
            horaSalida
          ).format('HH:mm A')}`}</p>
          <ImageCard
            onClick={() => window.open('/plan/' + idPlan, '_newtab')}
            image={urlFoto}
            title={plan}
            subtitle={ciudad}
            description={descripcion}
          />
        </Detalle>
        <div className="col-sm-12 col-md-9 p-0 m-0" style={{ height: '100vh' }}>
          <ReservationPage trip={trip} />
        </div>
      </div>
    </FullModal>
  );
}

const Detalle = styled.div`
  @media only screen and (min-width: ${MEDIA_SCREENS.MEDIUM.FROM + 'px'}) {
    height: 100vh;
    overflow-y: scroll;
  }
`;
