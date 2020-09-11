import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from '../../../components/common/wrappers/Section';

import PlanList from '../../../components/plan/PlanList';
import moment from 'moment';

// import { shell } from 'electron';
import SyncIcon from '@material-ui/icons/Sync';
import TimeAgo from 'react-timeago';
import Button from '../../../components/common/inputs/Button';

const PlanesPage = ({
  history,
  setPlan,
  agency,
  planes,
  loadingPlanes,
  loadPlanes,
  lastSyncPlanes,
}) => {
  useEffect(() => {
    // loadPlanes(agency.idPlanner);
    setPlan({});
  }, []);

  const onNewDate = idPlan => {
    history.push('/calendar');
  };

  return (
    <div className="container-fluid2" style={{ marginTop: '6rem' }}>
      <Section
        className="mt-4"
        title={agency.agencia}
        button={
          <Button
            color="primary"
            variant="outlined"
            className="ml-auto"
            onClick={() => history.push('/plan/create')}
          >
            Crear un nuevo plan
          </Button>
        }
      >
        <hr className="w-100" />
        <Section>
          <PlanList
            cols="col-sm-12 col-md-3 col-lg-3 col-xl-4 mb-4"
            button={
              <Button
                className="ml-auto"
                startIcon={<SyncIcon />}
                text={
                  moment(lastSyncPlanes).isValid() && (
                    <TimeAgo date={moment(lastSyncPlanes).toDate()} />
                  )
                }
                color="primary"
                loading={loadingPlanes}
                onClick={() => loadPlanes(agency.idPlanner)}
              />
            }
            showCardHeader={false}
            showStatus
            dummySize={3}
            title={`Tus planes`}
            planes={planes}
            onPublish={idPlan => console.log('Clicked ' + idPlan)}
            loading={loadingPlanes}
            // addAction={() => history.push('/plan/create')}
            onNewDate={onNewDate}
            onEdit={idPlan => history.push('/plan/create/' + idPlan)}
            // onWatch={idPlan =>
            //   shell.openExternal('https://nomadem.com/plan/' + idPlan)
            // }
            onDelete={idPlan => console.log(idPlan)}
          />
        </Section>
      </Section>
    </div>
  );
};

const mapStateToProps = ({ planState, loginState }, props) => {
  const {
    plan,
    planes,
    loadingList: loadingPlanes,
    lastSync: lastSyncPlanes,
  } = planState;
  const { usuario } = loginState;
  let agency = usuario.agencia;

  return {
    plan,
    usuario,
    agency,
    planes,
    loadingPlanes,
    lastSyncPlanes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPlan: plan => dispatch({ type: 'PLAN_CHANGE', plan }),
    loadPlan: idPlan => dispatch({ type: 'PLAN_GET_BY_ID', idPlan }),
    getPlanner: idPlanner => dispatch({ type: 'PLANNER_GET_BY_ID', idPlanner }),
    loadPlanes: idPlanner =>
      dispatch({ type: 'PLANES_GET_BY_PLANNER', idPlanner }),
  };
};

PlanesPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanesPage);
