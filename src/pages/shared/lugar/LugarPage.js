import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import LugarPortada from '../../../components/lugar/LugarPortada';
import LoadieWrap from '../../../components/common/wrappers/LoadieWrap';
import SectionCard from '../../../components/common/SectionCard';
import PlanesCard from '../../../components/plan/Card';
import Container from '../../../components/common/wrappers/Container';
import Section from '../../../components/common/wrappers/Section';
import LugarMapa from '../../../components/lugar/LugarMapa';
import AsideGrid from '../../../components/common/wrappers/AsideGrid';
// import MapContainer from '../../../components/common/MapContainer';
const LugarPage = ({
  history,
  match,
  lugarState,
  planState,
  loadLugares,
  loadPlanes,
}) => {
  const { idLugar } = match.params;
  const { lugares } = lugarState;
  const { planes } = planState;

  const [lugar, setLugar] = useState(false);
  if (lugarState.lugares.length && !lugar) {
    const index = lugares.findIndex(item => item.idLugar == idLugar);
    setLugar(lugares[index]);
  }
  useEffect(() => {
    if (idLugar && !lugares.lenght) {
      loadLugares();
      loadPlanes();
    } else {
      history.push('/404');
    }
  }, []);
  return (
    <AsideGrid web={{ left: 9, right: 3 }} mob={{ left: 1, right: 1 }}>
      <Fragment>
        <LugarPortada {...lugar} />

        <SectionCard
          title="Plans including this place"
          data={planes}
          Card={PlanesCard}
          carousel={true}
        />
      </Fragment>

      <Fragment>
        <Section title="Location">
          <LugarMapa latitud={lugar.latitud} longitud={lugar.longitud} />
        </Section>
        <LoadieWrap loading={lugarState.loadingList || planState.loadingList} />
      </Fragment>
    </AsideGrid>
  );
};

/// CONEXION CON REDUCERS
const mapStateToProps = state => {
  const { lugarState, loadLugares, planState, loadPlanes } = state;
  return {
    lugarState,
    planState,
    loadLugares,
    loadPlanes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadLugares: () => dispatch({ type: 'LUGARES_GET' }),
    loadPlanes: () => dispatch({ type: 'PLANES_GET' }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LugarPage);
