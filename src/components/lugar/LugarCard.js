import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from '../common/cards/ImageCard';

const LugarCard = ({ idLugar, lugar, ciudad, foto, onClick }) => {
  return (
    <ImageCard
      id={idLugar}
      title={lugar}
      subtitle={ciudad}
      description={'Offered in 4 plans'}
      image={`/assets/img/lugares/${foto}`}
      imgclassName="card-img-20"
      onClick={onClick}
    />
  );
};

LugarCard.propTypes = {
  idLugar: PropTypes.number,
  lugar: PropTypes.string.isRequired,
  foto: PropTypes.string,
  onClick: PropTypes.func,
};

export default LugarCard;
