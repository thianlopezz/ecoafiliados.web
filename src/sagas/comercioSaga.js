import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const getById = idComercio => {
  return axios.get(`${proxyConfig.url}/comercio/${idComercio}`);
};

const setIsOpen = comercio => {
  return axios.put(`${proxyConfig.url}/comercio/open`, comercio);
};

export function* getComercioById(action) {
  try {
    const response = yield call(getById, action.idComercio);
    const data = response.data;

    if (data) {
      yield put({ type: 'COMERCIO_GET_BY_ID_SUCCESS', comercio: data });
    } else {
      console.log(data.error);

      yield put({
        type: 'COMERCIO_GET_BY_ID_ERROR',
        error: data.error,
        message: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'COMERCIO_GET_BY_ID_ERROR',
      error,
      message: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* updateIsOpen(action) {
  try {
    const response = yield call(setIsOpen, action.comercio);

    const data = response.data;

    if (data.success) {
      yield put({ type: 'COMERCIO_OPEN_UPDATE_SUCCESS' });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      if (action.onSuccess) action.onSuccess();
    } else {
      yield put({
        type: 'COMERCIO_OPEN_UPDATE_ERROR',
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
      type: 'COMERCIO_OPEN_UPDATE_ERROR',
      error,
      message: 'Algo salió mal al conectarse al servidor.',
    });
  }
}
