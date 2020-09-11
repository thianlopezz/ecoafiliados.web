import React from 'react';
import PropTypes from 'prop-types';
import IncluidoList from '../incluido/IncluidoList';
import MapContainer from '../common/MapContainer';

const WhereWeStart = ({ descripcion, latitud, longitud }) => {
  return (
    <div className="row mt-4">
      <div className="col-md-4 col-sm-12">
        <h2>Where we start</h2>
      </div>
      <div className="col-md-8 col-sm-12">
        {/* <IncluidoList incluidos={incluidos} /> */}
      </div>
      <div className="col-12" style={{ height: '25rem' }}>
        <MapContainer zoom={14} center={{ lat: latitud, lng: longitud }} />
      </div>
    </div>
  );
};

WhereWeStart.propTypes = {
  latitud: PropTypes.number,
  longitud: PropTypes.number,
};

export default WhereWeStart;
