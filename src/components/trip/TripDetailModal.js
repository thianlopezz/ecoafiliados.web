import React, { useState } from 'react';
import FullModal from '../common/modals/FullModal';
import MapContainer from '../common/MapContainer';
import moment from 'moment';
import ImageCard from '../common/cards/ImageCard';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MEDIA_SCREENS } from '../../theme';

export default function TripDetailModal({ isOpen, trip, onClose }) {
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
          <hr></hr>
          <p>
            <Link
              onClick={e => {
                e.preventDefault();
                window.open(
                  `https://www.google.com/maps/search/${latitud}+${longitud}/@${latitud},${longitud}2,19z?hl=en`,
                  '_blank'
                );
              }}
            >
              Get directions
            </Link>
          </p>
          <hr></hr>
          <p>
            <Link>Contact agency</Link>
          </p>
          {acompanantes && acompanantes.length > 0 && (
            <div className="card">
              <div className="card-body px-0 px-0">
                <h4 className="card-title">Friends going with you</h4>
                {acompanantes.map(acompanante => (
                  <p>{`${acompanante.nombre} ${acompanante.apellido}`}</p>
                ))}
              </div>
            </div>
          )}
        </Detalle>
        <div className="col-sm-12 col-md-9 p-0 m-0" style={{ height: '100vh' }}>
          <MapContainer center={{ lat: trip.latitud, lng: trip.longitud }} />
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
