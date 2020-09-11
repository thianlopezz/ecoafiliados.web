import React from 'react';
import PropTypes from 'prop-types';
import CiudadCard from './CiudadCard';

import DummyCards from '../common/cards/DummyCards';
import EntityFrame from '../common/wrappers/EntityFrame';

const CiudadesList = ({
  ciudades,
  addAction,
  onClick,
  title,
  loading,
  cols,
}) => {
  if (!ciudades) {
    ciudades = [];
  }

  if (!cols) {
    cols = 'col-sm-12 col-md-6 col-lg-4 col-xl-4';
  }

  let ToShow;

  if (loading) {
    // ON LOADING
    ToShow = <DummyCards cols={cols} />;
  } else if (ciudades.length === 0) {
    // NO EXISTEN CIUDADES
    ToShow = (
      <div className="card w-100">
        <div className="card-body">
          <h1 className="text-center">
            <i className="far fa-sticky-note" />
          </h1>
          <p className="text-center">No cities to show</p>
        </div>
      </div>
    );
  } else {
    ToShow = ciudades.map((ciudad, index) => {
      return (
        <div className={'my-1 ' + cols} key={ciudad.idCiudad}>
          {index == 0 && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                zIndex: 1,
              }}
            >
              <button className="btn btn-primary btn-icon-only rounded-circle">
                <i className="fas fa-chevron-left" />
              </button>
            </div>
          )}
          <CiudadCard {...ciudad} onClick={onClick} />

          {index == ciudades.length - 1 && (
            <div style={{ position: 'absolute', top: '50%', right: '0' }}>
              <button className="btn btn-primary btn-icon-only rounded-circle">
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <EntityFrame title={title} handle={addAction}>
      <div className="row flex">{ToShow}</div>
    </EntityFrame>
  );
};

CiudadesList.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.array,
  ciudades: PropTypes.array.isRequired,
  addAction: PropTypes.func,
  onClick: PropTypes.func,
  cols: PropTypes.string,
};

export default CiudadesList;
