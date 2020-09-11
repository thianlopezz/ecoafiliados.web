import React from 'react';
import PropTypes from 'prop-types';
import TitleDescriptionCard from '../common/cards/TitleDescriptionCard';

const ActividadList = ({ actividades }) => {
  return (
    <div className="row">
      {actividades.map(actividad => (
        <div key={actividad.idActividad} className="col-4 my-2">
          <TitleDescriptionCard
            icon={actividad.fa}
            title={actividad.actividad}
          />
        </div>
      ))}
    </div>
  );
};

ActividadList.propTypes = {
  incluidos: PropTypes.array,
};

export default ActividadList;
