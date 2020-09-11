import React from 'react';
import PropTypes from 'prop-types';
import TitleDescriptionCard from '../common/cards/TitleDescriptionCard';

const IncluidoList = ({ incluidos }) => {
  return (
    <div className="row">
      {incluidos.map(incluido => (
        <div key={incluido.idIncluido} className="col-4">
          <TitleDescriptionCard
            icon={incluido.fa}
            title={incluido.incluido}
            description={incluido.descripcion}
          />
        </div>
      ))}
    </div>
  );
};

IncluidoList.propTypes = {
  incluidos: PropTypes.array,
};

export default IncluidoList;
