import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const getLugares = () => {
  return axios.get(`${proxyConfig.url}/api/lugar`);
};

const getLugaresByCiudad = idCiudad => {
  return axios.get(`${proxyConfig.url}/api/lugar/${idCiudad}`);
};

export function* getLugaresSaga() {
  try {
    const response = yield call(getLugares);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'LUGARES_GET_SUCCESS', lugares: data.lugares });
    } else {
      console.log(data.error);

      yield put({
        type: 'LUGARES_GET_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'LUGARES_GET_ERROR',
      error,
      mensaje: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* getLugaresByCiudadSaga(action) {
  try {
    const response = yield call(getLugaresByCiudad, action.idCiudad);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'LUGARES_GET_SUCCESS', lugares: data.lugares });
    } else {
      console.log(data.error);

      yield put({
        type: 'LUGARES_GET_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'LUGARES_GET_ERROR',
      error,
      mensaje: error.message,
    });
  }
}
