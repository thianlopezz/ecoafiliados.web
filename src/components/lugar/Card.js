import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from '../common/cards/ImageCard';
import { PLACEDEF } from '../../constants';

const Card = ({
  idLugar,
  lugar,
  ciudad,
  foto,
  loading,
  goToPlanner,
  goToLugar,
}) => {
  const urlFoto = foto ? `/assets/img/lugares/${foto}` : PLACEDEF;

  return (
    <ImageCard
      idLugar={idLugar}
      title={lugar}
      subtitle={ciudad}
      description={'Offered in 4 plans'}
      image={urlFoto}
      imgclassName="card-img-20"
      link={`/lugar/${idLugar}`}
    />
  );
};

export default Card;
