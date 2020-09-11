import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { getToken } from '../helpers/sesion';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const getActividades = () => {
  let headers = { 'x-access-token': getToken() };
  return axios.get(`${proxyConfig.url}/api/actividad`, {
    headers,
  });
};

export function* getActividadesSaga() {
  try {
    const response = yield call(getActividades);
    const data = response.data;

    if (data.success) {
      yield put({
        type: 'ACTIVIDADES_GET_SUCCESS',
        actividades: data.actividades,
      });
    } else {
      console.log(data.error);

      yield put({
        type: 'ACTIVIDADES_GET_ERROR',
        error: data.error,
        message: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'ACTIVIDADES_GET_ERROR',
      error,
      message: 'Algo salió mal al conectarse al servidor.',
    });
  }
}
