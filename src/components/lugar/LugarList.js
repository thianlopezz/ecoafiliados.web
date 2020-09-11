import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LugarCard from './LugarCard';

import EntityFrame from '../common/wrappers/EntityFrame';
import DummyCards from '../common/cards/DummyCards';

const LugaresList = ({
  lugares,
  addAction,
  editAction,
  deleteAction,
  detailAction,
  title,
  loading,
  cols,
  horizontal,
  showEmpty = false,
  elemsToShow = lugares.length || 4,
}) => {
  let [elemIni, setElemIni] = useState(0);

  if (!lugares) {
    lugares = [];
  }

  let lugaresToRender = lugares.filter(
    (lugar, index) => index >= elemIni && index < elemIni + elemsToShow
  );

  if (!cols) {
    cols = 'col-sm-12 col-md-4 col-lg-2 col-xl-2';
  }

  let ToShow;

  if (loading) {
    ToShow = <DummyCards cols={cols} />;
  } else if (lugares.length === 0) {
    ToShow = showEmpty ? (
      <div className="card w-100">
        <div className="card-body">
          <h1 className="text-center">
            <i className="far fa-sticky-note" />
          </h1>
          <p className="text-center">No existen lugares</p>
        </div>
      </div>
    ) : null;
  } else if (!horizontal) {
    ToShow = lugaresToRender.map(lugar => (
      <div
        className={'my-1 ' + cols}
        style={{ display: 'flex' }}
        key={lugar.idLugar}
      >
        <LugarCard {...lugar} landscapeCardImage={lugar.foto} />
      </div>
    ));
  } else {
    ToShow = lugaresToRender.map((lugar, index) => {
      return (
        <div
          className={'my-1 ' + cols}
          style={{ display: 'flex' }}
          key={lugar.idLugar}
        >
          {index == 0 && (
            <div
              style={{ position: 'absolute', top: '50%', left: '0', zIndex: 1 }}
            >
              <button
                onClick={() => {
                  if (elemIni !== 0) {
                    elemIni--;
                    setElemIni(elemIni);
                  }
                }}
                className="btn btn-primary btn-icon-only rounded-circle"
              >
                <i className="fas fa-chevron-left" />
              </button>
            </div>
          )}
          <LugarCard {...lugar} landscapeCardImage={lugar.foto} />
          {index == lugaresToRender.length - 1 && (
            <div style={{ position: 'absolute', top: '50%', right: '0' }}>
              <button
                onClick={() => {
                  if (elemIni + elemsToShow !== lugares.length) {
                    elemIni++;
                    setElemIni(elemIni);
                  }
                }}
                className="btn btn-primary btn-icon-only rounded-circle"
              >
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

LugaresList.propTypes = {
  lugares: PropTypes.array,
  editAction: PropTypes.func,
  deleteAction: PropTypes.func,
  detailAction: PropTypes.func,
};

export default LugaresList;
