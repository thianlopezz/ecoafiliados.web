import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IncluidoList from '../incluido/IncluidoList';
import MapContainer from '../common/MapContainer';

const LugarMapa = ({ descripcion, latitud, longitud }) => {
  return (
    <Fragment>
      <div style={{ height: '25rem' }}>
        <MapContainer zoom={8} center={{ lat: latitud, lng: longitud }} />
      </div>
    </Fragment>
  );
};

LugarMapa.propTypes = {
  latitud: PropTypes.number,
  longitud: PropTypes.number,
};

export default LugarMapa;
