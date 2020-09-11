import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { getToken, getSesion } from '../helpers/sesion';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const saveReserva = reserva => {
  let headers = { 'x-access-token': getToken() };

  return axios.post(`${proxyConfig.url}/api/reserva`, reserva, { headers });
};

const deleteReserva = (idCompra, notificar) => {
  let headers = { 'x-access-token': getToken() };

  let { idUsuario } = getSesion();
  return axios.delete(
    `${proxyConfig.url}/api/reserva/${idCompra}/${idUsuario}/${notificar}`,
    {
      headers,
    }
  );
};

export function* saveReservaSaga(action) {
  try {
    const response = yield call(saveReserva, action.reserva);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'RESERVA_SAVE_SUCCESS' });
      yield put({ type: 'TRIP_GET_BY_ID_SUCCESS', trip: data.trip });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      if (action.onSuccess) action.onSuccess();
    } else {
      yield put({
        type: 'RESERVA_SAVE_ERROR',
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
      type: 'RESERVA_SAVE_ERROR',
      error,
      message: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* deleteReservaSaga(action) {
  try {
    const response = yield call(
      deleteReserva,
      action.idCompra,
      action.notificar
    );
    const data = response.data;

    if (data.success) {
      yield put({ type: 'RESERVA_DELETE_SUCCESS' });

      yield put({ type: 'TRIP_GET_BY_ID_SUCCESS', trip: data.trip });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      if (action.onSuccess) action.onSuccess();
    } else {
      yield put({
        type: 'RESERVA_DELETE_ERROR',
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
      type: 'RESERVA_DELETE_ERROR',
      error,
      message: 'Algo salió mal al conectarse al servidor.',
    });
  }
}
