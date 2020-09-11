import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import Section from '../../../components/common/wrappers/Section';
import Calendar from '../../../components/common/calendar/Calendar';
import Button from '../../../components/common/inputs/Button';
import TripForm from '../../../components/trip/TripForm';
import TripShortInfoList from '../../../components/trip/TripShortInfoList';
import TripInfo from '../../../components/trip/TripInfo';
import TitleAction from '../../../components/common/TitleAction';
import SyncIcon from '@material-ui/icons/Sync';
import TimeAgo from 'react-timeago';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const filterTripsByDate = (trips, date) => {
  return trips.filter(trip =>
    moment(trip.feSalida).isSame(moment(date), 'days')
  );
};

const CalendarPage = ({
  history,
  loading,
  loadingList,
  trip,
  trips,
  planes,
  planOptions,
  diasOption,
  usuario,
  loadTrips,
  loadPlanes,
  loadDias,
  tripChange,
  saveTrip,
  updateTrip,
  showConfirm,
  hideConfirm,
  deleteTrip,
  loadingConfirm,
  lastSyncTrips,
}) => {
  const [viewMode, setViewMode] = useState('TRIP_LIST');
  // const [selectedTrip, setSelectedTrip] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(() => {
    // loadTrips();
    loadPlanes(usuario.agencia.idPlanner);
    loadDias();
  }, []);

  const onClickTrip = trip => {
    let tripSelected = trips.find(
      tripFinding => tripFinding.idSalida == trip.idSalida
    );
    tripChange(tripSelected);
    setViewMode('TRIP_INFO');
  };

  let dateTrips = trips.map(trip => moment(trip.feSalida));
  let tripsFilter = filterTripsByDate(trips, selectedDate);

  const onConfirmDelete = () => {
    loadingConfirm(true);
    deleteTrip(trip.idSalida, () => {
      loadingConfirm(false);
      hideConfirm();
      setViewMode('TRIP_LIST');
    });
  };

  return (
    <div className="container-fluid2" style={{ marginTop: '6rem' }}>
      <Section className="mt-4">
        <div className="row">
          <div className="col-sm-12 col-md-8 col-lg-7">
            <Calendar
              datesChecked={dateTrips}
              value={selectedDate}
              onChange={date => {
                setSelectedDate(moment(date));
                setViewMode('TRIP_LIST');
              }}
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-5">
            {viewMode == 'TRIP_LIST' && (
              <>
                <div className="d-flex">
                  <h3 className="my-auto">
                    {moment(selectedDate).format('ddd[,] DD MMM YYYY')}
                  </h3>
                  <div className="ml-auto text-center">
                    <Button
                      startIcon={<SyncIcon />}
                      text={
                        moment(lastSyncTrips).isValid() && (
                          <TimeAgo
                            date={moment(lastSyncTrips).toDate()}
                            // minPeriod={60}
                          />
                        )
                      }
                      color="primary"
                      loading={loadingList}
                      onClick={loadTrips}
                    />
                    {/* {!loadingList && (
                      <p className="my-0">
                        {lastSyncTrips &&
                          moment(lastSyncTrips).format('ddd[,] DD MMM hh:mm A')}
                      </p>
                    )} */}
                  </div>
                </div>
                <hr className="w-100"></hr>
                <TripShortInfoList
                  loading={loadingList}
                  trips={tripsFilter}
                  // onClickTrip={onClickTrip}
                  onClickDetail={onClickTrip}
                  onClickSeeReservation={idSalida =>
                    history.push('/reservation/' + idSalida)
                  }
                  onNewTrip={
                    !loadingList &&
                    moment(selectedDate).isSameOrAfter(moment(), 'day')
                      ? () => {
                          tripChange({
                            horaInicio: new Date(),
                            horaFin: new Date(),
                            seRepite: 0,
                            feHasta: selectedDate,
                          });
                          setViewMode('TRIP_FORM');
                        }
                      : null
                  }
                />
              </>
            )}
            {viewMode == 'TRIP_FORM' && (
              <TripForm
                loading={loading}
                trip={trip}
                date={selectedDate}
                planes={planes}
                planOptions={planOptions}
                diasOption={diasOption}
                onTripChange={tripChange}
                onCancel={() =>
                  trip.idSalida
                    ? setViewMode('TRIP_INFO')
                    : setViewMode('TRIP_LIST')
                }
                onSubmit={trip => {
                  !trip.idSalida
                    ? saveTrip(trip, () => setViewMode('TRIP_LIST'))
                    : updateTrip(trip, () => setViewMode('TRIP_INFO'));
                }}
              />
            )}
            {viewMode == 'TRIP_INFO' && (
              <>
                {/* Para que funcione startIcon debemos actualizar material-ui */}
                <Button
                  startIcon={<ArrowBackIosIcon fontSize="inherit" />}
                  color="primary"
                  className="ml-auto"
                  onClick={() => setViewMode('TRIP_LIST')}
                  // startIcon={}
                >
                  Regresar
                </Button>
                <TitleAction
                  title={moment(selectedDate).format('ddd[,] DD MMM YYYY')}
                  text1="Editar"
                  isOnAction={viewMode == 'TRIP_FORM'}
                  disableAction1={
                    !moment(selectedDate).isSameOrAfter(moment(), 'day')
                  }
                  action1={() => {
                    setViewMode('TRIP_FORM');
                    tripChange(trip);
                  }}
                  action2={() => {
                    setViewMode('TRIP_INFO');
                  }}
                />
                <TripInfo
                  trip={trip}
                  disableDelete={
                    !moment(selectedDate).isSameOrAfter(moment(), 'day')
                  }
                  onReservas={idSalida =>
                    history.push('/reservation/' + idSalida)
                  }
                  onDelete={() =>
                    showConfirm({
                      titulo: 'Eliminiar viaje',
                      mensaje: '¿Estás seguro de eliminar este viaje?',
                      confirmText: 'Continuar',
                      cancelText: 'Cancelar',
                      onConfirm: onConfirmDelete,
                    })
                  }
                />
              </>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

const mapStateToProps = (
  { tripState, planState, loginState, diaState },
  props
) => {
  const {
    trip,
    trips,
    loadingList,
    loading,
    lastSync: lastSyncTrips,
  } = tripState;
  const { planes } = planState;
  const { usuario } = loginState;
  const { dias } = diaState;

  const diasOption = dias.map(dia => {
    return { value: dia.idDia, text: dia.es };
  });

  const planOptions = planes
    .filter(plan => plan.isInfoCompleted)
    .map(plan => {
      return { value: plan.idPlan, text: plan.plan };
    });

  return {
    planes,
    planOptions,
    diasOption,
    trip,
    trips,
    loading,
    loadingList,
    usuario,
    lastSyncTrips,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tripChange: trip => dispatch({ type: 'TRIP_CHANGE', trip }),
    loadTrips: () => dispatch({ type: 'TRIP_GET_BY_PLANNER' }),
    loadPlanes: idPlanner =>
      dispatch({ type: 'PLANES_GET_BY_PLANNER', idPlanner }),
    loadDias: () => dispatch({ type: 'DIAS_GET' }),
    saveTrip: (trip, onSuccess) =>
      dispatch({ type: 'TRIP_SAVE', trip, onSuccess }),
    updateTrip: (trip, onSuccess) =>
      dispatch({ type: 'TRIP_UPDATE', trip, onSuccess }),
    showConfirm: config => dispatch({ type: 'OPEN_CONFIRM', config }),
    hideConfirm: () => dispatch({ type: 'CLOSE_CONFIRM' }),
    deleteTrip: (idSalida, onSuccess) =>
      dispatch({ type: 'TRIP_DELETE', idSalida, onSuccess }),
    loadingConfirm: loading => dispatch({ type: 'LOADING_CONFIRM', loading }),
  };
};

CalendarPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarPage);
