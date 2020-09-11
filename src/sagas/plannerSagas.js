import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { getToken } from '../helpers/sesion';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const getPlannerById = idPlanner => {
  return axios.get(`${proxyConfig.url}/api/planner/${idPlanner}`);
};

const getPlannerByIdUsuario = idUsuario => {
  let headers = { 'x-access-token': getToken() };
  return axios.get(`${proxyConfig.url}/api/planner/usuario/${idUsuario}`, {
    headers,
  });
};

const saveBasicInfo = planner => {
  let headers = { 'x-access-token': getToken() };
  return axios.post(`${proxyConfig.url}/api/planner/basic`, planner, {
    headers,
  });
};

const saveLocationInfo = planner => {
  let headers = { 'x-access-token': getToken() };
  return axios.post(`${proxyConfig.url}/api/planner/location`, planner, {
    headers,
  });
};

const saveBrandnInfo = (idUsuario, idPlanner, file) => {
  let headers = { 'x-access-token': getToken() };

  let data = new FormData();
  data.append('idUsuario', idUsuario);
  data.append('idPlanner', idPlanner);
  data.append('file', file);

  return axios.post(`${proxyConfig.url}/api/planner/brand`, data, {
    headers: {
      accept: 'application/json',
      // 'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      ...headers,
    },
  });
};

const updateSessionInfo = agencia => {
  let usuario = JSON.parse(localStorage.getItem('usuario'));
  usuario = { ...usuario, agencia };
  localStorage.setItem('usuario', JSON.stringify(usuario));

  return usuario;
};

export function* getPlannerByIdSaga(action) {
  try {
    const response = yield call(getPlannerById, action.idPlanner);

    const data = response.data;

    if (data.success) {
      yield put({
        type: 'PLANNER_GET_BY_ID_SUCCESS',
        planner: data.planner || {},
      });
    } else {
      console.log(data.error);

      yield put({
        type: 'PLANNER_GET_BY_ID_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'PLANNER_GET_BY_ID_ERROR',
      error,
      mensaje: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* getPlannerByIdUsuarioSaga(action) {
  try {
    const response = yield call(getPlannerByIdUsuario, action.idUsuario);
    const data = response.data;

    if (data.success) {
      let stepForm;

      let { planner } = data;

      if (!planner) {
        stepForm = 0;
      } else if (!planner.direccion || !planner.latitud || !planner.longitud) {
        stepForm = 1;
      } else {
        stepForm = 2;
      }
      // Si ya tiene la información completa va a agencypage
      if (planner && planner.isInfoCompleted && action.toAgencyPage) {
        action.toAgencyPage(planner.idPlanner);
      }
      yield put({
        type: 'PLANNER_GET_BY_ID_USUARIO_SUCCESS',
        planner: planner || {},
        stepForm,
      });
    } else {
      console.log(data.error);

      yield put({
        type: 'PLANNER_GET_BY_ID_USUARIO_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'PLANNER_GET_BY_ID_USUARIO_ERROR',
      error,
      mensaje: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* saveBasicInfoSaga(action) {
  try {
    const response = yield call(saveBasicInfo, action.planner);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'PLANNER_SAVE_SUCCESS' });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      yield put({ type: 'PLANNER_CHANGE', planner: data.planner });
      yield put({ type: 'PLANNNER_STEP_FORM_CHANGE', stepForm: 1 });

      if (action.onSuccess) action.onSuccess();
    } else {
      console.log(data.error);

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'PLANNER_SAVE_ERROR',
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
      type: 'PLANNER_SAVE_ERROR',
      error,
      mensaje: error.message,
    });
  }
}

export function* saveLocationInfoSaga(action) {
  try {
    const response = yield call(saveLocationInfo, action.planner);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'PLANNER_SAVE_SUCCESS' });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      yield put({ type: 'PLANNER_CHANGE', planner: data.planner });
      yield put({ type: 'PLANNNER_STEP_FORM_CHANGE', stepForm: 2 });

      if (action.onSuccess) action.onSuccess();
    } else {
      console.log(data.error);

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'PLANNER_SAVE_ERROR',
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
      type: 'PLANNER_SAVE_ERROR',
      error,
      mensaje: error.message,
    });
  }
}

export function* saveBrandInfoSaga(action) {
  try {
    const response = yield call(
      saveBrandnInfo,
      action.idUsuario,
      action.idPlanner,
      action.file
    );
    const data = response.data;

    if (data.success) {
      yield put({ type: 'PLANNER_SAVE_SUCCESS' });

      let usuario = updateSessionInfo(data.planner);

      yield put({ type: 'LOGIN_SUCCESS', usuario });
      // To agency page if comes function
      if (action.toAgencyPage) {
        action.toAgencyPage();
      }

      if (action.onSuccess) action.onSuccess();

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'PLANNER_GET_BY_ID_USUARIO',
        idUsuario: action.idUsuario,
      });
    } else {
      console.log(data.error);

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'PLANNER_SAVE_ERROR',
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
      type: 'PLANNER_SAVE_ERROR',
      error,
      mensaje: error.message,
    });
  }
}
