import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionCard from '../../../components/common/SectionCard';

import PlanesCard from '../../../components/plan/Card';
import CiudadCard from '../../../components/ciudad/CiudadCard';
import LugarCard from '../../../components/lugar/Card';

import LoadieWrap from '../../../components/common/wrappers/LoadieWrap';
import SocialLogin from '../../../components/account/SocialLogin';
import Container from '../../../components/common/wrappers/Container';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.loadPlanes();
    this.props.loadCiudades();
    this.props.loadLugares();
  }

  render() {
    const goToPlan = id => {
      this.props.history.push('/plan/' + id);
    };
    const goToLugar = id => {
      this.props.history.push('/lugar/' + id);
    };
    //here bro

    const goToPlanner = id => {
      this.props.history.push('/agency/' + id);
    };

    const goToCiudad = id => {
      this.props.history.push('/city/' + id);
    };

    const { loadingCiudades, loadingPlanes, loadingLugares } = this.props;

    return (
      <LoadieWrap loading={loadingCiudades || loadingPlanes || loadingLugares}>
        <Container>
          <SectionCard
            title="Destinations"
            data={this.props.ciudades}
            Card={CiudadCard}
          />
          <SectionCard
            title="Plans"
            data={this.props.planes}
            Card={PlanesCard}
            carousel={true}
          />
          <SectionCard
            title="Places"
            data={this.props.lugares}
            Card={LugarCard}
            carousel={false}
          />
        </Container>
      </LoadieWrap>
    );
  }
}

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

Home.propTypes = {
  ciudades: PropTypes.arrayOf(Object),
  planes: PropTypes.arrayOf(Object),
  lugares: PropTypes.arrayOf(Object),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
