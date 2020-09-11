import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Section from '../../../components/common/wrappers/Section';
import ImageFit from '../../../components/common/ImageFit';
import LugaresList from '../../../components/lugar/LugarList';
import PlanList from '../../../components/plan/PlanList';
import MapContainer from '../../../components/common/MapContainer';

const CiudadPage = ({
  history,
  match,
  loadingLugares,
  loadingPlanes,
  ciudad,
  lugares,
  planes,
  loadCiudad,
  loadLugares,
  loadPlanes,
}) => {
  useEffect(() => {
    loadCiudad(match.params.idCiudad);
    loadPlanes(match.params.idCiudad);
    loadLugares(match.params.idCiudad);
  }, []);

  return (
    <div className="container-fluid2 page">
      <Section className="mt-4">
        <h1>{ciudad.ciudad}</h1>
        <h2 className="text-muted">{ciudad.pais}</h2>
        <div style={{ height: '35vh' }}>
          <ImageFit image="/assets/img/san_cristobal.jpg" />
        </div>
      </Section>
      <Section>
        <h2>Location</h2>
        {ciudad.idCiudad && (
          <div style={{ height: '20rem' }}>
            <MapContainer
              zoom={14}
              center={{ lat: ciudad.latitud, lng: ciudad.longitud }}
            />
          </div>
        )}
      </Section>
      <Section>
        <h2>Places</h2>
        <p>Places offered in plans by the agencies of this city</p>
        <LugaresList
          cols="col-sm-12 col-md-4 col-lg-3 col-xl-3"
          lugares={lugares}
          loading={loadingLugares}
          elemsToShow={4}
          horizontal={true}
        />
      </Section>
      <Section>
        <PlanList
          title="Plans"
          planes={planes}
          loading={loadingPlanes}
          elemsToShow={4}
          onClick={idPlan => history.push('/plan/' + idPlan)}
        />
      </Section>
    </div>
  );
};

const mapStateToProps = ({ ciudadState, lugarState, planState }, props) => {
  const { ciudad, loadingList: loadingCiudad } = ciudadState;
  const { lugares, loadingList: loadingLugares } = lugarState;
  const { planes, loadingList: loadingPlanes } = planState;

  return {
    ciudad,
    lugares,
    planes,
    loadingCiudad,
    loadingLugares,
    loadingPlanes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCiudad: idCiudad => dispatch({ type: 'CIUDADES_GET_BY_ID', idCiudad }),
    loadPlanes: idCiudad =>
      dispatch({ type: 'PLANES_GET_BY_CIUDAD', idCiudad }),
    loadLugares: idCiudad =>
      dispatch({ type: 'LUGARES_GET_BY_CIUDAD', idCiudad }),
  };
};

CiudadPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CiudadPage);
