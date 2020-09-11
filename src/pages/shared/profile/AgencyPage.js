import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from '../../../components/common/wrappers/Section';
import TravelerReviews from '../../../components/plan/TravelerReviews';
import Rating from 'react-rating';
import PlanList from '../../../components/plan/PlanList';
import moment from 'moment';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PlanDetailModal from '../../../components/plan/PlanDetailModal';

const reviews = [
  {
    image:
      'https://miro.medium.com/fit/c/256/256/1*85AoiyLeFdu9Qqhr4niO3Q.jpeg',
    nombre: 'Thian Lopez',
    stars: 4.5,
    fecha: '23 Ago, 2019',
    comentario:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

const AgencyPage = ({
  match,
  history,
  loadPlan,
  setPlan,
  loadPlanes,
  getPlanner,
  agency,
  plan,
  planes,
  usuario,
  loadingPlanes,
  loadingAgency,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [planSelected, setPlanSelected] = useState({});

  useEffect(() => {
    getPlanner(match.params.idPlanner);
    loadPlanes(match.params.idPlanner);
    setPlan({});
  }, []);

  const onSeeDates = idPlan => {
    let plan = planes.find(plan => plan.idPlan == idPlan);
    setPlan(plan);

    if (plan.isInfoCompleted) {
      // history.push('/plan/' + idPlan);
      loadPlan(idPlan);
      setModalOpen(true);
    }
  };

  const onSeeReservation = idPlan => {
    history.push('/reservation/' + idPlan);
  };

  let isOwnerOfAgency = (() => {
    let returnValue = true;
    if (!usuario) {
      returnValue = false;
    } else if (!usuario.agencia) {
      returnValue = false;
    } else if (usuario.agencia.idPlanner != match.params.idPlanner) {
      returnValue = false;
    }

    return returnValue;
  })();

  return (
    <div className="container-fluid2 page">
      <Section>
        <div className="row mt-4">
          <div className="col-md-3 col-sm-12">
            <div className="card">
              <div className="card-body">
                <Avatar
                  className="mx-auto"
                  src={agency.urlLogo}
                  style={{ width: '120px', height: '120px' }}
                />
                <p className="my-2 text-center">
                  {4.5} &nbsp;
                  <Rating
                    initialRating={4.5}
                    fullSymbol={<i className="fas fa-star" />}
                    emptySymbol={<i className="far fa-star" />}
                  />
                </p>
                <hr className="w-100" />
                <p className="text-muted">
                  <span className="mx-1">
                    <i className="fas fa-home"></i>
                  </span>
                  <a href="javascript:;">
                    {agency.ciudad}, {agency.pais}
                  </a>
                </p>
                <p className="text-muted">
                  <span className="mx-1">
                    <i className="fas fa-map-marker"></i>
                  </span>
                  {agency.direccion}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-9 col-sm-12">
            <h1 className="mb-0">{agency.agencia}</h1>
            <div className="d-flex">
              <div className="p-2">
                <p className="text-muted">
                  Joined on{' '}
                  {agency.feCreacion &&
                    moment(agency.feCreacion).format('YYYY')}
                </p>
              </div>
              {isOwnerOfAgency && (
                <div className="p-2">
                  <Link to="/account/agency-info">Edit agency profile</Link>
                </div>
              )}
            </div>
            <hr className="w-100" />
            <Section>
              <div>
                <PlanList
                  cols="col-sm-12 col-md-4 col-lg-4 col-xl-4"
                  title={`Plans ofered by ${agency.agencia || ''}`}
                  addText="Empieza a ofrecer un plan"
                  addAction={() => history.push('/plan/create')}
                  planes={planes}
                  onClick={idPlan => window.open('/plan/' + idPlan, '_newtab')}
                  loading={loadingPlanes}
                />
              </div>
            </Section>
            <hr className="w-100" />
            <Section>
              <TravelerReviews stars={4} reviews={reviews} />
            </Section>
          </div>
        </div>
      </Section>
      {isModalOpen && (
        <PlanDetailModal
          isOpen={isModalOpen}
          plan={plan}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ plannerState, planState, loginState }, props) => {
  const { planner: agency, loadingList: loadingAgency } = plannerState;
  const { plan, planes, loadingList: loadingPlanes } = planState;
  const { usuario } = loginState;

  return {
    plan,
    usuario,
    agency,
    loadingAgency,
    planes,
    loadingPlanes,
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

AgencyPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgencyPage);
