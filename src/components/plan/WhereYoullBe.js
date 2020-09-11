import React from 'react';
import PropTypes from 'prop-types';
import LugaresList from '../lugar/LugarList';

const WhereYoullBe = ({ lugares }) => {
  return (
    <div className="row mt-4">
      <div className="col-md-4 col-sm-12">
        <h2>Where you'll be</h2>
      </div>
      <div className="col-md-8 col-sm-12">
        <LugaresList lugares={lugares} cols="col-md-4 col-sm-12" />
      </div>
    </div>
  );
};

WhereYoullBe.propTypes = {
  lugares: PropTypes.array,
};

export default WhereYoullBe;
