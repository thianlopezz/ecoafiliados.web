import React from 'react';
import PropTypes from 'prop-types';
import ActividadList from '../actividad/ActividadList';

const WhatsYoullDo = ({ actividades }) => {
  return (
    <div className="row mt-4">
      <div className="col-md-4 col-sm-12">
        <h2>What you'll do</h2>
      </div>
      <div className="col-md-8 col-sm-12">
        <ActividadList actividades={actividades} />
      </div>
    </div>
  );
};

WhatsYoullDo.propTypes = {
  incluidos: PropTypes.array,
};

export default WhatsYoullDo;
