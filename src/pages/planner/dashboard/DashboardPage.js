import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Section from '../../../components/common/wrappers/Section';
import VerTodos from '../../../components/common/VerTodos';
import TripShortInfoList from '../../../components/trip/TripShortInfoList';
import moment from 'moment';
import Button from '../../../components/common/inputs/Button';
import SyncIcon from '@material-ui/icons/Sync';
import TimeAgo from 'react-timeago';
import OrdersTable from '../../../components/orders/OrdersTable';
import OrderDetailModal from '../../../components/orders/OrderDetailModal';
import noti from '../../../assets/noti.mp3';
import {
  FormControlLabel,
  Switch,
  FormGroup,
  CircularProgress,
} from '@material-ui/core';
import DummyCards from '../../../components/common/cards/DummyCards';

const DashboardPage = ({
  loadingOrder,
  loadingList,
  orders,
  loadOrders,
  updateOrderState,
  updateOpenComercio,
  loadingComercio,
  loadingComercioList,
  comercio,
  usuario,
  lastSyncOrders,
  showConfirm,
  hideConfirm,
}) => {
  const [orderSelected, setOrderSelected] = useState({});
  const [isDetailOrderOpen, setIsDetailOrderOpen] = useState(false);

  useEffect(() => {
    loadOrders(usuario.idComercio);
    const interval = setInterval(() => {
      if (!loadingList) loadOrders(usuario.idComercio);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  let hasToAttend = orders.find(order => order.estado == 'pending');

  return (
    <div className="container-fluid2" style={{ marginTop: '6rem' }}>
      {hasToAttend && (
        <audio autoPlay loop>
          <source src={noti} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      <Section className="mt-4">
        <div className="col-12 px-0">
          {!loadingComercioList || comercio.idComercio ? (
            <Section
              title={comercio.nombre}
              description={comercio.direccion}
              button={
                <FormControlLabel
                  className="ml-auto"
                  control={
                    loadingComercio ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Switch
                        color={comercio.isOpen == 1 ? 'primary' : 'default'}
                        checked={true}
                        onChange={() =>
                          updateOpenComercio({
                            idComercio: comercio.idComercio,
                            isOpen: comercio.isOpen == 1 ? 0 : 1,
                          })
                        }
                        name="isOpen"
                      />
                    )
                  }
                  label={comercio.isOpen == 1 ? 'Abierto' : 'Cerrado'}
                />
              }
            ></Section>
          ) : (
            <div className="row">
              <DummyCards cols="col-12 px-0" size={1} disablePhoto />
            </div>
          )}

          {/* <hr className="w-100"></hr> */}
          <Section
            title="Pedidos"
            description="Estos son tus pedidos en Ecodelivery"
            button={
              <Button
                className="ml-auto"
                startIcon={<SyncIcon />}
                text={
                  moment(lastSyncOrders).isValid() && (
                    <TimeAgo
                      date={moment(lastSyncOrders).toDate()}
                      // minPeriod={60}
                    />
                  )
                }
                color="primary"
                loading={loadingList}
                onClick={() => loadOrders(usuario.idComercio)}
              />
            }
          >
            <OrdersTable
              orders={orders}
              loading={loadingList && orders.length == 0}
              onDetail={idOrden => {
                setOrderSelected(
                  orders.find(order => order.idOrden == idOrden)
                );
                setIsDetailOrderOpen(true);
              }}
            />
          </Section>
        </div>
      </Section>
      <OrderDetailModal
        isOpen={isDetailOrderOpen}
        loading={loadingOrder}
        order={orderSelected}
        onClose={() => setIsDetailOrderOpen(false)}
        showConfirm={config => showConfirm(config)}
        onChangeOrderState={order =>
          hideConfirm() &&
          updateOrderState(order, () => {
            setIsDetailOrderOpen(false);
            loadOrders();
          })
        }
      />
    </div>
  );
};

const mapStateToProps = ({ orderState, loginState, comercioState }, props) => {
  const {
    orders,
    loadingList,
    loading: loadingOrder,
    error,
    lastSync: lastSyncOrders,
  } = orderState;

  const {
    loadingList: loadingComercioList,
    loading: loadingComercio,
    comercio,
  } = comercioState;

  const { usuario } = loginState;
  return {
    orders,
    loadingList,
    loadingOrder,
    usuario,
    lastSyncOrders,
    loadingComercio,
    loadingComercioList,
    comercio,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadOrders: idComercio => dispatch({ type: 'ORDERS_GET', idComercio }),
    updateOrderState: (order, onSuccess) =>
      dispatch({ type: 'ORDER_STATE_UPDATE', order, onSuccess }),
    updateOpenComercio: comercio =>
      dispatch({ type: 'COMERCIO_OPEN_UPDATE', comercio }),
    showConfirm: config => dispatch({ type: 'OPEN_CONFIRM', config }),
    hideConfirm: () => dispatch({ type: 'CLOSE_CONFIRM' }),
  };
};

DashboardPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
