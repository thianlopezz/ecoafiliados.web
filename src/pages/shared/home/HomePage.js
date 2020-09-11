import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CiudadList from '../../../components/ciudad/CiudadList';
import PlanList from '../../../components/plan/PlanList';
import LugarList from '../../../components/lugar/LugarList';
import VerTodos from '../../../components/common/VerTodos';
import TitleDescriptionCard from '../../../components/common/cards/TitleDescriptionCard';
import Section from '../../../components/common/wrappers/Section';

const HomePage = ({
  history,
  loadCiudades,
  loadPlanes,
  loadLugares,
  ciudades,
  loadingCiudades,
  planes,
  loadingPlanes,
  lugares,
  loadingLugares,
}) => {
  useEffect(() => {
    loadCiudades();
    loadPlanes();
    loadLugares();
  }, []);

  const onDetalleCiudad = idCiudad => {
    history.push('/city/' + idCiudad);
  };

  const onPlanClick = idPlan => {
    history.push('/plan/' + idPlan);
  };

  const onPlannerClick = idPlanner => {
    history.push('/agency/' + idPlanner);
  };

  const handleOnBack = () => {
    history.goBack();
  };

  const todosCiudadesAction = () => {
    history.push('/ciudad');
  };

  const todosLugaresAction = () => {
    history.push('/lugar');
  };

  const todosPlanesAction = () => {
    history.push('/plan');
  };

  const addAction = () => {
    history.push('/plan/new');
  };

  return (
    <div className="container-fluid2 page">
      <Section className="mt-4">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <h2>Before you get into the islands</h2>
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="card-deck">
              <TitleDescriptionCard
                icon={'far fa-money-bill-alt'}
                title={'Entrance fee'}
                description={
                  'Know the fees you have to pay until you get into the Galapagos, TCT and National Park entrance fee'
                }
              />
              <TitleDescriptionCard
                icon={'fas fa-apple-alt'}
                title={'Prohibited, restricted, allowed products'}
                description={
                  'Check the prohibited, restricted, allowed products to take in mind before your travel to the islands'
                }
              />
            </div>
          </div>
        </div>
      </Section>
      {/* CIUDADES */}
      <Section>
        <CiudadList
          title="Cities"
          ciudades={ciudades}
          onClick={onDetalleCiudad}
          loading={ciudades.length == 0 && loadingCiudades}
          horizontal={true}
        />
        {ciudades.length > 0 && (
          <VerTodos text={'Show all'} goAction={todosCiudadesAction} />
        )}
      </Section>
      {/* PLANES */}
      <Section>
        <PlanList
          title="Plans"
          planes={planes}
          onClickPlanner={onPlannerClick}
          onClick={onPlanClick}
          loading={planes.length == 0 && loadingPlanes}
          elemsToShow={4}
        />
        {planes.length > 0 && (
          <VerTodos text={'Show all'} goAction={todosPlanesAction} />
        )}
      </Section>
      {/* LUGARES */}
      <Section>
        <LugarList
          title="Places"
          cols="col-sm-12 col-md-4 col-lg-3 col-xl-3"
          lugares={lugares}
          loading={lugares.length == 0 && loadingLugares}
          horizontal={true}
          elemsToShow="4"
        />
        {lugares.length > 0 && (
          <VerTodos text={'Show all'} goAction={todosLugaresAction} />
        )}
      </Section>
    </div>
  );
};

const mapStateToProps = ({ ciudadState, planState, lugarState }, props) => {
  const { ciudades, loadingList: loadingCiudades } = ciudadState;
  const { planes, loadingList: loadingPlanes } = planState;
  const { lugares, loadingList: loadingLugares } = lugarState;

  return {
    ciudades,
    loadingCiudades,
    planes,
    loadingPlanes,
    lugares,
    loadingLugares,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCiudades: () => dispatch({ type: 'CIUDADES_GET' }),
    loadPlanes: () => dispatch({ type: 'PLANES_GET' }),
    loadLugares: () => dispatch({ type: 'LUGARES_GET' }),
  };
};

HomePage.propTypes = {
  ciudades: PropTypes.arrayOf(Object),
  planes: PropTypes.arrayOf(Object),
  lugares: PropTypes.arrayOf(Object),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
