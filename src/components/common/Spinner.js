import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = ({}) => {
  return (
    <div className="w-100 text-center">
      <CircularProgress />
    </div>
  );
};

Spinner.propTypes = {};

export default Spinner;
