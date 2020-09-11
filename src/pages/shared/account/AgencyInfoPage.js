import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from '../../../components/common/wrappers/Section';
import TitleDescriptionCard from '../../../components/common/cards/TitleDescriptionCard';
import Spinner from '../../../components/common/Spinner';
import BasicInfoForm from '../../../components/agency/BasicInfoForm';
import BasicInfo from '../../../components/agency/BasicInfo';
import Button from '../../../components/common/inputs/Button';
import LocationForm from '../../../components/agency/LocationForm';
import LocationInfo from '../../../components/agency/LocationInfo';
import BrandInfoForm from '../../../components/agency/BrandInfoForm';
import BrandInfo from '../../../components/agency/BrandInfo';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';

const AgencyInfoPage = ({
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
  getPlanner,
  loadCiudades,
  showToast,
}) => {
  let [isBasicFormToEdit, setBasicFormToEdit] = useState(false);
  let [isLocationFormToEdit, setLocationFormToEdit] = useState(false);
  let [isBrandFormToEdit, setBrandFormToEdit] = useState(false);

  useEffect(() => {
    getPlanner(usuario.idUsuario);
    loadCiudades();
  }, []);

  return (
    <div className="container" style={{ marginTop: '4rem' }}>
      <Section className="mt-4">
        <Breadcrumbs className="mb-2" separator=" › " aria-label="breadcrumb">
          <Link
            color="inherit"
            href="javascript:;"
            onClick={() => history.push('/account/settings')}
          >
            Configuración de cuenta
          </Link>
          <Typography color="textPrimary">Información de agencia</Typography>
        </Breadcrumbs>
        <h2>Información de agencia</h2>
      </Section>
      <Section>
        <div className="row mt-4">
          <div className="col-md-8 col-sm-12">
            {loadingList ? (
              <Spinner />
            ) : (
              <div className="w-100">
                <div className="d-flex mb-4">
                  <h3>Marca</h3>
                  {!isBrandFormToEdit ? (
                    <Button
                      color="primary"
                      className="ml-auto"
                      onClick={() => {
                        setBrandFormToEdit(true);
                        setBasicFormToEdit(false);
                        setLocationFormToEdit(false);
                      }}
                    >
                      Editar
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      className="ml-auto"
                      onClick={() => setBrandFormToEdit(false)}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
                <Section>
                  {!isBrandFormToEdit ? (
                    <BrandInfo planner={planner} />
                  ) : (
                    <BrandInfoForm
                      onSubmit={file =>
                        saveBrandInfo(
                          planner.idUsuario,
                          planner.idPlanner,
                          file,
                          () => setBrandFormToEdit(false)
                        )
                      }
                      loading={loading}
                      planner={planner}
                      onPlannerChange={changePlanner}
                      onFileTooBig={() =>
                        showToast('El archivo debe ser menor a 3MB')
                      }
                    />
                  )}
                </Section>
                <Section>
                  <div className="d-flex mb-4">
                    <h3>Información básica</h3>
                    {!isBasicFormToEdit ? (
                      <Button
                        color="primary"
                        className="ml-auto"
                        onClick={() => {
                          setBasicFormToEdit(true);
                          setBrandFormToEdit(false);
                          setLocationFormToEdit(false);
                        }}
                      >
                        Editar
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        className="ml-auto"
                        onClick={() => setBasicFormToEdit(false)}
                      >
                        Cancelar
                      </Button>
                    )}
                  </div>
                  {!isBasicFormToEdit ? (
                    <BasicInfo planner={planner} />
                  ) : (
                    <BasicInfoForm
                      loading={loading}
                      onSubmit={planner =>
                        saveBasicInfo(
                          {
                            ...planner,
                            idUsuario: usuario.idUsuario,
                          },
                          () => setBasicFormToEdit(false)
                        )
                      }
                      planner={planner}
                      onPlannerChange={changePlanner}
                    />
                  )}
                </Section>
                <Section>
                  <div className="d-flex mb-4">
                    <h3>Información de ubicación</h3>
                    {!isLocationFormToEdit ? (
                      <Button
                        color="primary"
                        className="ml-auto"
                        onClick={() => {
                          setLocationFormToEdit(true);
                          setBrandFormToEdit(false);
                          setBasicFormToEdit(false);
                        }}
                      >
                        Editar
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        className="ml-auto"
                        onClick={() => setLocationFormToEdit(false)}
                      >
                        Cancelar
                      </Button>
                    )}
                  </div>
                  {!isLocationFormToEdit ? (
                    <LocationInfo planner={planner} />
                  ) : (
                    <LocationForm
                      onSubmit={planner =>
                        saveLocationInfo(
                          {
                            ...planner,
                          },
                          () => setLocationFormToEdit(false)
                        )
                      }
                      ciudadesOption={ciudadesOption}
                      loading={loading}
                      planner={planner}
                      onPlannerChange={changePlanner}
                    />
                  )}
                </Section>
              </div>
            )}
          </div>
          {!loadingList && (
            <div className="col-md-4 col-sm-12">
              <TitleDescriptionCard
                icon="fas fa-info"
                title="What info you shared about your agency"
                description="Provide all the information about your agency"
              />
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

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
      dispatch({ type: 'PLANNER_GET_BY_ID_USUARIO', idUsuario }),
    saveBasicInfo: (planner, onSuccess) =>
      dispatch({ type: 'PLANNER_BASIC_INFO_SAVE', planner, onSuccess }),
    saveLocationInfo: (planner, onSuccess) =>
      dispatch({ type: 'PLANNER_LOCATION_INFO_SAVE', planner, onSuccess }),
    saveBrandInfo: (idUsuario, idPlanner, file, onSuccess) =>
      dispatch({
        type: 'PLANNER_BRAND_INFO_SAVE',
        idUsuario,
        idPlanner,
        file,
        onSuccess,
      }),
    loadCiudades: () => dispatch({ type: 'CIUDADES_GET' }),
    showToast: (mensaje, variant) =>
      dispatch({ type: 'SHOW_SNACKBAR', mensaje, variant }),
  };
};

AgencyInfoPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgencyInfoPage);
