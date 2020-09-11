import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { getToken, getSesion } from '../helpers/sesion';
import { handleAxiosError } from '../helpers/errorHandlers';
import { proxyConfig } from '../helpers/proxyConfig';

const getTripsById = idSalida => {
  let headers = { 'x-access-token': getToken() };
  return axios.get(`${proxyConfig.url}/api/trip/${idSalida}`, { headers });
};

const getTripsByUsuario = idUsuario => {
  let headers = { 'x-access-token': getToken() };
  return axios.get(`${proxyConfig.url}/api/trip/usuario/` + idUsuario, {
    headers,
  });
};

const getTripsByPlanner = () => {
  let headers = { 'x-access-token': getToken() };
  let { agencia } = getSesion();
  return axios.get(`${proxyConfig.url}/api/trip/planner/${agencia.idPlanner}`, {
    headers,
  });
};

const getTripPlan = (idSalida, idPlan) => {
  let headers = { 'x-access-token': getToken() };
  return axios.get(`${proxyConfig.url}/api/trip/${idSalida}/${idPlan}`, {
    headers,
  });
};

const saveTrip = trip => {
  let headers = { 'x-access-token': getToken() };
  let { idUsuario, agencia } = getSesion();
  return axios.post(
    `${proxyConfig.url}/api/trip`,
    { ...trip, idUsuario, idPlanner: agencia.idPlanner },
    { headers }
  );
};

const deleteTrip = idSalida => {
  let headers = { 'x-access-token': getToken() };
  let { idUsuario } = getSesion();
  return axios.delete(`${proxyConfig.url}/api/trip/${idSalida}/${idUsuario}`, {
    headers,
  });
};

export function* getTripsByIdSaga(action) {
  try {
    const response = yield call(getTripsById, action.idSalida);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'TRIP_GET_BY_ID_SUCCESS', trip: data.trip });
    } else {
      console.log(data.error);

      yield put({
        type: 'TRIP_GET_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'TRIP_GET_ERROR',
      error,
      mensaje: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* getTripsByUsuarioSaga(action) {
  try {
    const response = yield call(getTripsByUsuario, action.idUsuario);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'TRIP_GET_SUCCESS', trips: data.trips });
    } else {
      console.log(data.error);

      yield put({
        type: 'TRIP_GET_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'TRIP_GET_ERROR',
      error,
      mensaje: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* getTripsByPlannerSaga(action) {
  try {
    const response = yield call(getTripsByPlanner);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'TRIP_GET_SUCCESS', trips: data.trips });
    } else {
      console.log(data.error);

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'error',
        mensaje: 'No se pudieron sincronizar los viajes',
      });

      yield put({
        type: 'TRIP_GET_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'SHOW_SNACKBAR',
      variant: 'error',
      mensaje: 'No se pudieron sincronizar los viajes',
    });

    yield put({
      type: 'TRIP_GET_ERROR',
      error,
      mensaje: error.message,
    });
  }
}

export function* getTripPlanSaga(action) {
  try {
    const response = yield call(getTripPlan, action.idSalida, action.idPlan);
    const data = response.data;

    if (data.success) {
      let { trip, plan } = data;
      yield put({
        type: 'TRIP_PLAN_GET_SUCCESS',
        trip,
      });
      yield put({
        type: 'PLAN_GET_BY_ID_SUCCESS',
        plan,
      });
    } else {
      console.log(data.error);

      yield put({
        type: 'TRIP_GET_ERROR',
        error: data.error,
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'TRIP_GET_ERROR',
      error,
      mensaje: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* saveTripSaga(action) {
  try {
    const response = yield call(saveTrip, action.trip);
    const data = response.data;

    if (data.success) {
      if (data.trips) {
        yield put({ type: 'TRIP_GET_SUCCESS', trips: data.trips });
      } else {
        yield put({ type: 'TRIP_SAVE_SUCCESS', trip: data.trip });
      }

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });
      action.onSuccess && action.onSuccess();
    } else {
      console.log(data.error);

      yield put({
        type: 'TRIP_SAVE_ERROR',
        error: data.error,
        message: data.mensaje,
      });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'TRIP_SAVE_ERROR',
      error,
      message: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* updateTripSaga(action) {
  try {
    const response = yield call(saveTrip, action.trip);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'TRIP_UPDATE_SUCCESS', trip: data.trip });
      yield put({ type: 'TRIP_CHANGE', trip: data.trip });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });
      action.onSuccess && action.onSuccess();
    } else {
      console.log(data.error);

      yield put({
        type: 'TRIP_UPDATE_ERROR',
        error: data.error,
        message: data.mensaje,
      });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'TRIP_UPDATE_ERROR',
      error,
      message: 'Algo salió mal al conectarse al servidor.',
    });
  }
}

export function* deleteTripSaga(action) {
  try {
    const response = yield call(deleteTrip, action.idSalida);
    const data = response.data;

    if (data.success) {
      yield put({ type: 'TRIP_DELETE_SUCCESS', idSalida: action.idSalida });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'success',
        mensaje: data.mensaje,
      });
      action.onSuccess && action.onSuccess();
    } else {
      console.log(data.error);

      yield put({
        type: 'TRIP_DELETE_ERROR',
        error: data.error,
        message: data.mensaje,
      });

      yield put({
        type: 'SHOW_SNACKBAR',
        variant: 'warning',
        mensaje: data.mensaje,
      });

      yield put({
        type: 'LOADING_CONFIRM',
        loading: false,
      });

      yield put({
        type: 'CLOSE_CONFIRM',
      });
    }
  } catch (error) {
    handleAxiosError(error);

    yield put({
      type: 'TRIP_DELETE_ERROR',
      error,
      message: 'Algo salió mal al conectarse al servidor.',
    });
  }
}
