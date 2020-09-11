import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from '../common/cards/ImageCard';

const sectionsStyle = { marginBottom: '6rem' };

const PlanCard = ({
  idPlan,
  plan,
  descripcion,
  agencia,
  ciudad,
  logoAgencia,
  foto,
  onClick,
}) => {
  let style = {};

  if (onClick) {
    style = { cursor: 'pointer' };
  }

  return (
    <section style={sectionsStyle}>
      <div className="row mt-4">
        <div className="col-md-4 col-sm-12" />
      </div>
    </section>
  );
};

PlanCard.propTypes = {
  idPlan: PropTypes.number,
  plan: PropTypes.string.isRequired,
  descripcion: PropTypes.string,
  agencia: PropTypes.string.isRequired,
  ciudad: PropTypes.string.isRequired,
  logoAgencia: PropTypes.string.isRequired,
  foto: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default PlanCard;
