import { takeLatest } from 'redux-saga/effects';
import { loginSaga, logoutSagas } from './loginSaga';
import { registroSaga, verificarSaga } from './registroSaga';
import {
  getUsuarioByIdSaga,
  cambiarContrasenaSaga,
  savePersonalInfoSaga,
  saveProfileInfoSaga,
} from './usuarioSaga';
import { getCiudadesSaga, getCiudadByIdSaga } from './ciudadSaga';
import {
  getPlanesSaga,
  getPlanesByPlannerSaga,
  savePlanBasicInfoSaga,
  getPlanByIdSaga,
  savePlanMainPictureSaga,
  savePlanIncluidosSaga,
  savePlanItinerarioSaga,
  savePlanLugaresSaga,
  savePlanActividadesSaga,
  getPlanesByCiudadSaga,
} from './planSaga';
import { getLugaresSaga, getLugaresByCiudadSaga } from './lugarSaga';
import { getPaisesSaga } from './paisSaga';
import {
  getPlannerByIdUsuarioSaga,
  saveBasicInfoSaga,
  saveLocationInfoSaga,
  saveBrandInfoSaga,
  getPlannerByIdSaga,
} from './plannerSagas';
import { getIncluidosSaga } from './incluidoSaga';
import { getDiasSaga } from './diaSaga';
import { getActividadesSaga } from './actividadSaga';
import {
  saveSalidaSaga,
  getSalidaByIdSaga,
  getSalidaPlanSaga,
} from './salidaSaga';
import { saveReservaSaga, deleteReservaSaga } from './reservaSaga';
import {
  getTripsByUsuarioSaga,
  getTripsByPlannerSaga,
  saveTripSaga,
  updateTripSaga,
  deleteTripSaga,
  getTripPlanSaga,
  getTripsByIdSaga,
} from './tripSaga';
import { getOrdersSaga, updateStateSaga } from './orderSaga';
import { getComercioById, updateIsOpen } from './comercioSaga';

export default function* watcherSaga() {
  yield takeLatest('LOGIN', loginSaga);
  yield takeLatest('LOGOUT', logoutSagas);
  yield takeLatest('REGISTRO', registroSaga);
  yield takeLatest('VERIFICAR', verificarSaga);

  yield takeLatest('USUARIO_GET_BY_ID', getUsuarioByIdSaga);
  yield takeLatest('USUARIO_SAVE_PROFILE_INFO', saveProfileInfoSaga);
  yield takeLatest('USUARIO_SAVE_PERSONAL_INFO', savePersonalInfoSaga);
  yield takeLatest('USUARIO_CHANGE_PASSWORD', cambiarContrasenaSaga);

  yield takeLatest('PLANNER_GET_BY_ID', getPlannerByIdSaga);
  yield takeLatest('PLANNER_GET_BY_ID_USUARIO', getPlannerByIdUsuarioSaga);
  yield takeLatest('PLANNER_BASIC_INFO_SAVE', saveBasicInfoSaga);
  yield takeLatest('PLANNER_LOCATION_INFO_SAVE', saveLocationInfoSaga);
  yield takeLatest('PLANNER_BRAND_INFO_SAVE', saveBrandInfoSaga);

  yield takeLatest('PLANES_GET', getPlanesSaga);
  yield takeLatest('PLANES_GET_BY_PLANNER', getPlanesByPlannerSaga);
  yield takeLatest('PLANES_GET_BY_CIUDAD', getPlanesByCiudadSaga);
  yield takeLatest('PLAN_GET_BY_ID', getPlanByIdSaga);
  yield takeLatest('PLAN_BASIC_INFO_SAVE', savePlanBasicInfoSaga);
  yield takeLatest('PLAN_MAIN_PICTURE_SAVE', savePlanMainPictureSaga);
  yield takeLatest('PLAN_INCLUIDOS_SAVE', savePlanIncluidosSaga);
  yield takeLatest('PLAN_ITINERARIOS_SAVE', savePlanItinerarioSaga);
  yield takeLatest('PLAN_LUGARES_SAVE', savePlanLugaresSaga);
  yield takeLatest('PLAN_ACTIVIDADES_SAVE', savePlanActividadesSaga);

  yield takeLatest('TRIP_GET_BY_ID', getTripsByIdSaga);
  yield takeLatest('TRIP_GET_BY_USUARIO', getTripsByUsuarioSaga);
  yield takeLatest('TRIP_GET_BY_PLANNER', getTripsByPlannerSaga);
  yield takeLatest('TRIP_PLAN_GET', getTripPlanSaga);
  yield takeLatest('TRIP_SAVE', saveTripSaga);
  yield takeLatest('TRIP_UPDATE', updateTripSaga);
  yield takeLatest('TRIP_UPDATE', updateTripSaga);
  yield takeLatest('TRIP_DELETE', deleteTripSaga);

  yield takeLatest('RESERVA_SAVE', saveReservaSaga);
  yield takeLatest('RESERVA_DELETE', deleteReservaSaga);

  yield takeLatest('CIUDADES_GET', getCiudadesSaga);
  yield takeLatest('CIUDADES_GET_BY_ID', getCiudadByIdSaga);

  yield takeLatest('LUGARES_GET', getLugaresSaga);
  yield takeLatest('LUGARES_GET_BY_CIUDAD', getLugaresByCiudadSaga);

  yield takeLatest('DIAS_GET', getDiasSaga);
  yield takeLatest('INCLUIDOS_GET', getIncluidosSaga);
  yield takeLatest('ACTIVIDADES_GET', getActividadesSaga);
  yield takeLatest('PAISES_GET', getPaisesSaga);

  yield takeLatest('ORDERS_GET', getOrdersSaga);

  yield takeLatest('ORDER_STATE_UPDATE', updateStateSaga);

  yield takeLatest('COMERCIO_GET_BY_ID', getComercioById);
  yield takeLatest('COMERCIO_OPEN_UPDATE', updateIsOpen);
}
