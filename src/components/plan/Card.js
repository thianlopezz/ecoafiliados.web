import React from 'react';
import ImageCard from '../common/cards/ImageCard';
import { PLACEDEF } from '../../constants';

export default function Card({
  idPlan,
  plan,
  descripcion,
  idPlanner,
  agencia,
  ciudad,
  logoAgencia,
  urlFoto,
  loading,
  goToPlanner,
  goToPlan,
}) {
  return (
    <ImageCard
      id={idPlan}
      title={plan}
      image={urlFoto || PLACEDEF}
      link={`/plan/${idPlan}`}
    />
  );
}
