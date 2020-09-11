import React from 'react';
import MapContainer from '../common/MapContainer';

const LocationInfo = ({ planner }) => {
  return (
    <div className="w-100">
      <h5>Ciudad</h5>
      <p>{planner.ciudad}</p>
      <hr className="w-100 my-3"></hr>
      <h5>Dirección</h5>
      <p>{planner.direccion}</p>
      <hr className="w-100 my-3"></hr>
      <div className="row">
        <div className="col-12">
          <h5>Ubicación en el mapa</h5>
        </div>
        <div className="col-12" style={{ height: '20rem' }}>
          <MapContainer
            center={{ lat: planner.latitud, lng: planner.longitud }}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
