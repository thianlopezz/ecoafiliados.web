import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const getOrders = idComercio => {
  return axios.get(`${proxyConfig.url}/order/afiliado/${idComercio}`);
};

const updateState = order => {
  return axios.put(`${proxyConfig.url}/order/state`, order);
};

export function* getOrdersSaga(action) {
  try {
    const response = yield call(getOrders, action.idComercio);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'ORDERS_GET_SUCCESS', orders: data.data });
    } else {
      console.log(data.error);

      yield put({
        type: 'ORDERS_GET_ERROR',
        error: data.error,
        message: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'ORDERS_GET_ERROR',
      error,
      message: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* updateStateSaga(action) {
  try {
    debugger;
    const response = yield call(updateState, action.order);
    debugger;
    const data = response.data;

    if (data.success) {
      yield put({
        type: 'ORDER_STATE_UPDATE_SUCCESS',
        order: action.order,
      });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      if (action.onSuccess) action.onSuccess();
    } else {
      yield put({
        type: 'ORDER_STATE_UPDATE_ERROR',
        message: data.mensaje,
        error: data.error,
      });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'error',
        mensaje: 'Something happened! :(',
      });
    }
  } catch (error) {
    console.log(error);
    handleAxiosError(error);

    yield put({
      type: 'SHOW_SNACKBAR',
      variant: 'error',
      mensaje: 'Something happened! :(',
    });

    yield put({
      type: 'ORDER_STATE_UPDATE_ERROR',
      error,
      message: 'Algo salió mal al conectarse al servidor.',
    });
  }
}
