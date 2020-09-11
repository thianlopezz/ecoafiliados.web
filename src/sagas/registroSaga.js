import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const registro = _registro => {
  return axios.post(`${proxyConfig.url}/api/registro`, {
    ..._registro,
  });
};

const verificar = token => {
  return axios.post(`${proxyConfig.url}/api/verificar`, {
    token,
  });
};

export function* registroSaga(action) {
  try {
    const response = yield call(registro, action.registro);
    const data = response.data;

    if (data.success) {
      // history.location = '/dashboard';
      action.navigate();
      yield put({ type: 'REGISTRO_SUCCESS' });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      yield put({ type: 'SHOW_LOGIN_MODAL', show: false });
    } else {
      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'REGISTRO_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    console.log(error);
    // handleAxiosError(error);

    yield put({
      type: 'SHOW_SNACKBAR',
      variant: 'error',
      mensaje: 'Something happened! :(',
    });

    yield put({
      type: 'REGISTRO_ERROR',
      error,
      message: 'Something went wrong.',
    });
  }
}

export function* verificarSaga(action) {
  try {
    const response = yield call(verificar, action.token);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'VERIFICAR_SUCCESS' });
    } else {
      yield put({ type: 'VERIFICAR_ERROR', mensaje: data.mensaje });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'VERIFICAR_ERROR',
      mensaje: 'Something happend, try this later.',
    });
  }
}
