import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from '../../../components/common/wrappers/Section';
import TitleDescriptionCard from '../../../components/common/cards/TitleDescriptionCard';
import Spinner from '../../../components/common/Spinner';
import PlanForm from '../../../components/plan/PlanForm';
import Button from '../../../components/common/inputs/Button';
import SyncIcon from '@material-ui/icons/Sync';
import TimeAgo from 'react-timeago';
import moment from 'moment';

const createIncluidosOptionGroups = incluidos => {
  let incluidosGroup = [...new Set(incluidos.map(x => x.tipoEs))];

  const incluidosOption = incluidos.map(incluido => {
    return {
      value: incluido.idIncluido,
      label: incluido.es,
      tipo: incluido.tipoEs,
    };
  });

  incluidosGroup = incluidosGroup.map(grupo => {
    return {
      label: grupo,
      options: incluidosOption.filter(incluido => incluido.tipo == grupo),
    };
  });

  return incluidosGroup;
};

const createLugaresOptionGroups = lugares => {
  let lugaresGroup = [...new Set(lugares.map(x => x.isla))];

  const lugaresOption = lugares.map(lugar => {
    return {
      value: lugar.idLugar,
      label: lugar.lugar,
      tipo: lugar.isla,
    };
  });

  lugaresGroup = lugaresGroup.map(grupo => {
    return {
      label: grupo,
      options: lugaresOption.filter(lugar => lugar.tipo == grupo),
    };
  });

  return lugaresGroup;
};

const PlanCreatePage = ({
  history,
  match,
  loadPlan,
  loadIncluidos,
  loadLugares,
  loadActividades,
  usuario,
  plan,
  loadingList,
  loading,
  lugares,
  incluidosOption,
  lugaresOption,
  actividadesOption,
  changePlan,
  saveBasicInfo,
  saveMainPicture,
  saveIncluidos,
  saveItinerarios,
  saveLugares,
  saveActividades,
  changeStepForm,
  stepForm,
  diasOption,
  showToast,
}) => {
  useEffect(() => {
    initStuff();
  }, []);

  let initStuff = () => {
    if (match.params.idPlan) {
      loadPlan(match.params.idPlan, plan => {
        if (plan.idPlanner != usuario.agencia.idPlanner) {
          history.push('/404');
        }
      });
    } else {
      changePlan({});
      changeStepForm(0);
    }

    loadIncluidos();
    loadLugares();
    loadActividades();
  };

  return (
    <div className="container-fluid2" style={{ marginTop: '6rem' }}>
      <Section
        className="my-4"
        title={match.params.idPlan ? 'Modifica tu plan' : 'Crea un plan'}
        description={'LLena toda la información para vender tu plan'}
        button={
          match.params.idPlan && (
            <Button
              className="ml-auto"
              startIcon={<SyncIcon />}
              text={
                moment(plan.lastSync).isValid() && (
                  <TimeAgo
                    date={moment(plan.lastSync).toDate()}
                    // minPeriod={60}
                  />
                )
              }
              color="primary"
              loading={loadingList}
              onClick={initStuff}
            />
          )
        }
      >
        <div className="row mt-4">
          <div className="col-md-8 col-sm-12">
            {loadingList ? (
              <Spinner />
            ) : (
              <PlanForm
                loading={loading}
                plan={plan}
                lugares={lugares}
                incluidosOption={incluidosOption}
                diasOption={diasOption}
                lugaresOption={lugaresOption}
                actividadesOption={actividadesOption}
                onPlanChange={changePlan}
                onChangeStepForm={changeStepForm}
                onSubmitBasicInfo={plan =>
                  saveBasicInfo(
                    {
                      ...plan,
                      idUsuario: usuario.idUsuario,
                      idPlanner: usuario.agencia.idPlanner,
                    },
                    idPlan => history.replace('/plan/create/' + idPlan)
                  )
                }
                onSubmitMainPicture={file =>
                  saveMainPicture(usuario.idUsuario, plan.idPlan, file)
                }
                onSubmitIncluidos={plan =>
                  plan.incluidos ? saveIncluidos(plan) : changeStepForm(3)
                }
                onSubmitItinerario={saveItinerarios}
                onSubmitLugares={saveLugares}
                onSubmitActividades={saveActividades}
                step={stepForm}
                onFileTooBig={() =>
                  showToast('El archivo debe ser menor a 3MB')
                }
              />
            )}
          </div>
          {!loadingList && (
            <div className="col-md-4 col-sm-12">
              {stepForm == 0 && (
                <TitleDescriptionCard
                  icon="fas fa-info"
                  title="Información básica"
                  description="Provee detalles básicos acerca del plan que ofreces. Un plan es igual a un tour o un paquete de actividades."
                />
              )}
              {stepForm == 1 && (
                <TitleDescriptionCard
                  icon="fas fa-hiking"
                  title="Actividades"
                  description={`Selecciona las actividades que se podrán realizar en tu plan.  Esta es una lista de las actividades permitidas en las islas, descritas en el "Plan de Manejo de las Áreas protegidas de Galápagos para el BUEN VIVIR" (2014)`}
                />
              )}
              {stepForm == 2 && (
                <TitleDescriptionCard
                  icon="fas fa-toolbox"
                  title="Incluidos"
                  description="Selecciona todo lo que provees en tu plan."
                />
              )}
              {stepForm == 3 && (
                <TitleDescriptionCard
                  icon="fas fa-map-marked"
                  title="Lugares"
                  description="Selecciona los lugares que vas a visitar en este plan."
                />
              )}
              {stepForm == 4 && (
                <TitleDescriptionCard
                  icon="fas fa-image"
                  title="Foto de portada"
                  description="Sube una foto de portada para este plan, trata de subir una buena foto, de esta manera tendrás más oportunidad de vender tu plan."
                />
              )}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

const mapStateToProps = (
  {
    loginState,
    planState,
    incluidoState,
    diaState,
    lugarState,
    actividadState,
  },
  props
) => {
  const { usuario } = loginState;
  const { plan, loading, loadingList, stepForm } = planState;
  const { incluidos } = incluidoState;
  const { dias } = diaState;
  const { lugares } = lugarState;
  const { actividades } = actividadState;

  const incluidosOption = createIncluidosOptionGroups(incluidos);

  const diasOption = dias.map(dia => {
    return { value: dia.idDia, text: dia.dia };
  });

  const lugaresOption = createLugaresOptionGroups(lugares);

  const actividadesOption = actividades.map(actividad => {
    return { value: actividad.idActividad, text: actividad.es };
  });

  return {
    usuario,
    loadingList,
    incluidosOption,
    diasOption,
    lugaresOption,
    actividadesOption,
    lugares,
    loading,
    plan,
    stepForm,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePlan: plan => dispatch({ type: 'PLAN_CHANGE', plan }),
    loadPlan: (idPlan, onSuccess) =>
      dispatch({ type: 'PLAN_GET_BY_ID', idPlan, onSuccess }),
    saveBasicInfo: (plan, onSuccess) =>
      dispatch({ type: 'PLAN_BASIC_INFO_SAVE', plan, onSuccess }),
    saveMainPicture: (idUsuario, idPlan, file) =>
      dispatch({ type: 'PLAN_MAIN_PICTURE_SAVE', idUsuario, idPlan, file }),
    saveIncluidos: plan =>
      dispatch({
        type: 'PLAN_INCLUIDOS_SAVE',
        plan,
      }),
    saveItinerarios: plan =>
      dispatch({
        type: 'PLAN_ITINERARIOS_SAVE',
        plan,
      }),
    saveLugares: plan =>
      dispatch({
        type: 'PLAN_LUGARES_SAVE',
        plan,
      }),
    saveActividades: plan =>
      dispatch({
        type: 'PLAN_ACTIVIDADES_SAVE',
        plan,
      }),
    changeStepForm: stepForm => {
      dispatch({
        type: 'PLAN_STEP_FORM_CHANGE',
        stepForm,
      });
    },
    loadDias: () => dispatch({ type: 'DIAS_GET' }),
    loadLugares: () => dispatch({ type: 'LUGARES_GET' }),
    loadIncluidos: () => dispatch({ type: 'INCLUIDOS_GET' }),
    loadActividades: () => dispatch({ type: 'ACTIVIDADES_GET' }),
    showToast: (mensaje, variant) =>
      dispatch({ type: 'SHOW_SNACKBAR', mensaje, variant }),
  };
};

PlanCreatePage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlanCreatePage);
