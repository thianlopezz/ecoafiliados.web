import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from '../../../components/common/wrappers/Section';
import ReservationTable from '../../../components/reservation/ReservationTable';
import TravelerTable from '../../../components/traveler/TravelerTable';
import ReviewPayModal from '../../traveler/PayAndReview/ReviewPay';
import Button from '../../../components/common/inputs/Button';
import TripShortInfoItem from '../../../components/trip/TripShortInfoItem';
import { Link } from 'react-router-dom';
import { palette } from '../../../theme';
import moment from 'moment';
import SyncIcon from '@material-ui/icons/Sync';
import TimeAgo from 'react-timeago';
import DeleteReservationConfirmModal from '../../../components/reservation/DeleteReservationConfirmModal';
import { generatePassengerReport } from '../../../helpers/pdfHelper';

const ReservationPage = props => {
  const [selectedView, setselectedView] = useState('RESERVA');
  const [isCheckingOut, setCheckingOut] = useState(false);
  const [isOpenConfirmDelete, setOpenConfirmDelete] = useState(false);

  useEffect(() => {
    props.loadTrip(match.params.idTrip);
    props.loadTrips();
  }, []);

  const {
    trip,
    trips = [],
    match,
    history,
    loadingList,
    loadingReserva,
    reservaChange,
    showConfirm,
    reserva,
    reservaDelete,
  } = props;
  // const trip = trips.find(item => item.idSalida == match.params.idTrip) || {};
  const onCheckout = reserva => {
    reserva && reservaChange(reserva);
    setCheckingOut(true);
  };

  let tripsComing = (() => {
    let index = trips.findIndex(trip => trip.idSalida == match.params.idTrip);
    let inicio = index - 2;
    let final = index + 3;

    inicio = inicio < 0 ? 0 : inicio;
    final = final > trips.length - 1 ? trips.length : final;

    return trips.slice(inicio, final);
  })();

  return (
    <>
      {trip.idSalida && (
        <ReviewPayModal
          open={isCheckingOut}
          onClose={() => setCheckingOut(false)}
          trip={trip}
          history={history}
          onDelete={() => setOpenConfirmDelete(true)}
        />
      )}
      <div className="container-fluid2" style={{ marginTop: '6rem' }}>
        <div className="row p-0 m-0">
          <div className="col-sm-12 col-md-2">
            <Section
              title="Viajes"
              // description="Mostrar por"
            >
              {tripsComing.map(trip => (
                <div
                  style={{
                    borderRight:
                      trip.idSalida == match.params.idTrip
                        ? `solid ${palette.primary.main}`
                        : 'unset',
                  }}
                >
                  <Link
                    to={'/reservation/' + trip.idSalida}
                    onClick={() => props.loadTrip(trip.idSalida)}
                  >
                    {trip.plan}
                  </Link>
                  <p>{moment(trip.feSalida).format('ddd[,] DD MMM YYYY')}</p>
                  {/* <hr className="w-100"></hr> */}
                </div>
              ))}
            </Section>
          </div>
          <div className="col-sm-12 col-md-10">
            <Section
              title={selectedView == 'RESERVA' ? 'Reservas' : 'Pasajeros'}
              button={
                <Button
                  className="ml-auto"
                  startIcon={<SyncIcon />}
                  text={
                    moment(trip.lastSync).isValid() && (
                      <TimeAgo
                        date={moment(trip.lastSync).toDate()}
                        // minPeriod={60}
                      />
                    )
                  }
                  color="primary"
                  loading={loadingList}
                  onClick={() => {
                    props.loadTrip(match.params.idTrip);
                    props.loadTrips();
                  }}
                />
              }
              // description="Mostrar por"
            >
              <div className="d-flex">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <Button
                    type="button"
                    color="primary"
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    variant={`${
                      selectedView == 'RESERVA' ? 'contained' : 'outlined'
                    }`}
                    onClick={() => setselectedView('RESERVA')}
                  >
                    Reservas
                  </Button>
                  <Button
                    type="button"
                    color="primary"
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    variant={`${
                      selectedView == 'PASAJERO' ? 'contained' : 'outlined'
                    }`}
                    onClick={() => setselectedView('PASAJERO')}
                  >
                    Pasajeros
                  </Button>
                </div>
                {!loadingList && trip.ocupados < trip.cupos ? (
                  <Button
                    onClick={() => onCheckout({ cupos: 1, pasajeros: [{}] })}
                    disabled={moment(trip.feSalida).isBefore(moment(), 'day')}
                    type="button"
                    color="primary"
                    variant="outlined"
                    className="ml-auto"
                  >
                    Agregar
                  </Button>
                ) : (
                  <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    className="ml-auto"
                    disabled
                  >
                    {loadingList ? 'Cargando' : 'Agotado'}
                  </Button>
                )}
              </div>
            </Section>
            <Section>
              <TripShortInfoItem
                loading={loadingList}
                {...trip}
                feSalida={trip.feSalida}
                // onClick={onClickTrip}
                showOccupationSlide
              />
            </Section>
            <Section>
              {selectedView == 'RESERVA' ? (
                <ReservationTable
                  loading={loadingList}
                  reservations={trip.reservas}
                  onDetail={idCompra => {
                    let reserva = trip.reservas.find(
                      reserva => reserva.idCompra == idCompra
                    );
                    onCheckout({
                      ...reserva,
                      pasajeros: trip.pasajeros.filter(
                        pasajero => pasajero.idCompra == idCompra
                      ),
                    });
                  }}
                />
              ) : (
                <>
                  <div className="d-flex">
                    <Button
                      onClick={() =>
                        generatePassengerReport({
                          pasajeros: trip.pasajeros.filter(
                            pasajero => pasajero.estado == 'A'
                          ),
                        })
                      }
                      // disabled={moment(trip.feSalida).isBefore(moment())}
                      type="button"
                      color="primary"
                      variant="outlined"
                      className="ml-auto mb-1"
                    >
                      Generar pdf
                    </Button>
                  </div>
                  <TravelerTable
                    loading={loadingList}
                    travelers={trip.pasajeros.filter(
                      pasajero => pasajero.estado == 'A'
                    )}
                  />
                </>
              )}
            </Section>
          </div>
        </div>
      </div>
      {isOpenConfirmDelete && (
        <DeleteReservationConfirmModal
          loading={loadingReserva}
          isOpen={isOpenConfirmDelete}
          onCloseModal={() => setOpenConfirmDelete(false)}
          onConfirm={notificar =>
            reservaDelete(reserva.idCompra, notificar, () => {
              setOpenConfirmDelete(false);
              setCheckingOut(false);
              reservaChange({ cupos: 1, pasajeros: [{}] });
            })
          }
          confirmText="Eliminar"
          cancelText="Cancelar"
        />
      )}
    </>
  );
};

const mapStateToProps = ({ tripState, loginState, reservaState }, props) => {
  const { trip, trips, loadingList } = tripState;
  const { usuario } = loginState;
  const { reserva, loading: loadingReserva } = reservaState;
  return {
    trip,
    trips,
    loadingReserva,
    loadingList,
    usuario,
    reserva,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reservaChange: reserva => dispatch({ type: 'RESERVA_CHANGE', reserva }),
    reservaDelete: (idCompra, notificar, onSuccess) =>
      dispatch({ type: 'RESERVA_DELETE', idCompra, notificar, onSuccess }),
    showConfirm: config => dispatch({ type: 'OPEN_CONFIRM', config }),
    loadTrip: idSalida => dispatch({ type: 'TRIP_GET_BY_ID', idSalida }),
    loadTrips: () => dispatch({ type: 'TRIP_GET_BY_PLANNER' }),
  };
};

ReservationPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservationPage);
