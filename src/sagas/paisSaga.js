import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const getPaises = () => {
  return axios.get(`${proxyConfig.url}/api/pais`);
};

export function* getPaisesSaga(action) {
  try {
    const response = yield call(getPaises);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'PAISES_GET_SUCCESS', paises: data.paises });
    } else {
      console.log(data.error);

      yield put({
        type: 'PAISES_GET_ERROR',
        error: data.error,
        message: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'PAISES_GET_ERROR',
      error,
      message: 'Algo salió mal al conectarse al servidor.',
    });
  }
}
