import React from 'react';
import PropTypes from 'prop-types';
import IncluidoList from '../incluido/IncluidoList';

const WhatsInclude = ({ incluidos }) => {
  return (
    <div className="row mt-4">
      <div className="col-md-4 col-sm-12">
        <h2>What's included</h2>
      </div>
      <div className="col-md-8 col-sm-12">
        <IncluidoList incluidos={incluidos} />
      </div>
    </div>
  );
};

WhatsInclude.propTypes = {
  incluidos: PropTypes.array,
};

export default WhatsInclude;
