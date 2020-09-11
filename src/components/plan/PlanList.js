import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanCard from './PlanCard';

import DummyCards from '../common/cards/DummyCards';
import EntityFrame from '../common/wrappers/EntityFrame';
import SyncIcon from '@material-ui/icons/Sync';
import TimeAgo from 'react-timeago';
import Button from '../common/inputs/Button';
import moment from 'moment';

const PlanList = ({
  planes,
  lastSync,
  onSync,
  onClickPlanner,
  onClick,
  showCardHeader,
  showStatus,
  onNewDate,
  onEdit,
  onWatch,
  onDelete,
  title,
  loading,
  cols,
  dummySize,
  button,
}) => {
  let [elemIni, setElemIni] = useState(0);

  if (!planes) {
    planes = [];
  }

  if (!cols) {
    cols = 'col-sm-12 col-md-4 col-lg-3 col-xl-3';
  }

  let ToShow;

  if (loading) {
    // ON LOADING
    ToShow = <DummyCards size={dummySize} cols={cols} />;
  } else if (planes.length === 0) {
    // NO EXISTEN CIUDADES
    ToShow = (
      <div className="card w-100">
        <div className="card-body">
          <h1 className="text-center">
            <i className="far fa-sticky-note" />
          </h1>
          <p className="text-center">No existen planes para mostrar</p>
        </div>
      </div>
    );
  } else {
    ToShow = planes.map(plan => {
      return (
        <div className={'my-1 ' + cols} key={plan.idPlan}>
          <PlanCard
            {...plan}
            showCardHeader={showCardHeader}
            showStatus={showStatus}
            onClickPlanner={onClickPlanner}
            onClick={onClick}
            onNewDate={onNewDate}
            onEdit={onEdit}
            onWatch={onWatch}
            onDelete={onDelete}
          />
        </div>
      );
    });
  }

  return (
    <EntityFrame title={title} button={button}>
      <div className="row flex">{ToShow}</div>
    </EntityFrame>
  );
};

PlanList.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
  planes: PropTypes.array,
  addAction: PropTypes.func,
  onClick: PropTypes.func,
  cols: PropTypes.string,
};

export default PlanList;
