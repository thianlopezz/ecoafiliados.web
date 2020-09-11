import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from '../common/cards/ImageCard';

const CiudadCard = ({ idCiudad, ciudad, landscapeCardImage, onClick }) => {
  return (
    <ImageCard
      id={idCiudad}
      title={ciudad}
      image={`/assets/img/ciudades/${landscapeCardImage}`}
      link={`/city/${idCiudad}`}
    />
  );
};

CiudadCard.propTypes = {
  idCiudad: PropTypes.number,
  ciudad: PropTypes.string.isRequired,
  landscapeCardImage: PropTypes.string,
  onClick: PropTypes.func,
};

export default CiudadCard;
