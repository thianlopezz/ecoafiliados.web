import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from '../../../components/common/wrappers/Section';
import TitleDescriptionCard from '../../../components/common/cards/TitleDescriptionCard';
import AgencyForm from '../../../components/agency/AgencyForm';
import Spinner from '../../../components/common/Spinner';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';

class BecomeAgencyPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { usuario, getPlanner, loadCiudades } = this.props;
    getPlanner(usuario.idUsuario, idPlanner =>
      this.props.history.replace('/agency/' + idPlanner)
    );
    loadCiudades();
  }

  render() {
    const {
      history,
      usuario,
      planner,
      loadingList,
      loading,
      changePlanner,
      saveBasicInfo,
      saveLocationInfo,
      saveBrandInfo,
      stepForm,
      ciudadesOption,
    } = this.props;

    return (
      <div className="container page">
        <Section className="my-4">
          <Breadcrumbs className="mb-2" separator=" › " aria-label="breadcrumb">
            <Link
              color="inherit"
              href="javascript:;"
              onClick={() => history.push('/account/settings')}
            >
              Configuración de cuenta
            </Link>
            <Typography color="textPrimary">Become an agency</Typography>
          </Breadcrumbs>
          <h2>Become an agency</h2>
          <p>Fill out the info to become a plan provider at Nomadem</p>
        </Section>
        <Section>
          <div className="row mt-4">
            <div className="col-md-8 col-sm-12">
              {loadingList ? (
                <Spinner />
              ) : (
                <AgencyForm
                  ciudadesOption={ciudadesOption}
                  loading={loading}
                  planner={planner}
                  onPlannerChange={changePlanner}
                  onSubmitBasicInfo={planner =>
                    saveBasicInfo({
                      ...planner,
                      idUsuario: usuario.idUsuario,
                    })
                  }
                  onSubmitLocationInfo={planner =>
                    saveLocationInfo({
                      ...planner,
                    })
                  }
                  onSubmitBrandInfo={file =>
                    saveBrandInfo(
                      planner.idUsuario,
                      planner.idPlanner,
                      file,
                      () =>
                        this.props.history.replace(
                          '/agency/' + planner.idPlanner
                        )
                    )
                  }
                  step={stepForm}
                />
              )}
            </div>
            {!loadingList && (
              <div className="col-md-4 col-sm-12">
                {stepForm == 0 && (
                  <TitleDescriptionCard
                    icon="far fa-address-card"
                    title="Personal info"
                    description="Provide basic details about your agency and how we can reach you"
                  />
                )}
                {stepForm == 1 && (
                  <TitleDescriptionCard
                    icon="fas fa-location-arrow"
                    title="Location info"
                    description="Provide information of your agency location and address"
                  />
                )}
                {stepForm == 2 && (
                  <TitleDescriptionCard
                    icon="far fa-copyright"
                    title="Agency brand"
                    description="Upload your agency logo"
                  />
                )}
              </div>
            )}
          </div>
        </Section>
      </div>
    );
  }
}

const mapStateToProps = ({ loginState, plannerState, ciudadState }, props) => {
  const { usuario } = loginState;
  const { planner, loading, loadingList, stepForm } = plannerState;
  const { ciudades } = ciudadState;

  const ciudadesOption = ciudades.map(ciudad => {
    return { value: ciudad.idCiudad, text: ciudad.ciudad };
  });

  return {
    usuario,
    loadingList,
    loading,
    planner,
    stepForm,
    ciudadesOption,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePlanner: planner => dispatch({ type: 'PLANNER_CHANGE', planner }),
    getPlanner: (idUsuario, toAgencyPage) =>
      dispatch({ type: 'PLANNER_GET_BY_ID_USUARIO', idUsuario, toAgencyPage }),
    saveBasicInfo: planner =>
      dispatch({ type: 'PLANNER_BASIC_INFO_SAVE', planner }),
    saveLocationInfo: planner =>
      dispatch({ type: 'PLANNER_LOCATION_INFO_SAVE', planner }),
    saveBrandInfo: (idUsuario, idPlanner, file, toAgencyPage) =>
      dispatch({
        type: 'PLANNER_BRAND_INFO_SAVE',
        idUsuario,
        idPlanner,
        file,
        toAgencyPage,
      }),
    loadCiudades: () => dispatch({ type: 'CIUDADES_GET' }),
  };
};

BecomeAgencyPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BecomeAgencyPage);
