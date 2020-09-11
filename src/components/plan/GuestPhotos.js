import React from 'react';
import PropTypes from 'prop-types';
import IncluidoList from '../incluido/IncluidoList';

const GuestPhotos = ({ fotos }) => {
  return (
    <div className="row mt-4">
      <div className="col-md-4 col-sm-12">
        <h2>Guest photos</h2>
      </div>
      <div className="col-md-8 col-sm-12">
        {/* <IncluidoList incluidos={incluidos} /> */}
      </div>
    </div>
  );
};

GuestPhotos.propTypes = {
  fotos: PropTypes.array,
};

export default GuestPhotos;
