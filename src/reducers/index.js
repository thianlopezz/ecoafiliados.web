import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import planReducer from './planReducer';
import ciudadReducer from './ciudadReducer';
import lugarReducer from './lugarReducer';
import registroReducer from './registroReducer';
import usuarioReducer from './usuarioReducer';
import paisReducer from './paisReducer';
import plannerReducer from './plannerReducer';
import snackbarReducer from './snackbarReducer';
import incluidoReducer from './incluidoReducer';
import actividadReducer from './actividadReducer';
import diaReducer from './diaReducer';
import reservaReducer from './reservaReducer';
import salidaReducer from './salidaReducer';
import tripReducer from './tripReducer';
import confirmReducer from './confirmReducer';
import sideBarReducer from './sideBarReducer';
import orderReducer from './orderReducer';
import comercioReducer from './comercioReducer';

export default combineReducers({
  loginState: loginReducer,
  planState: planReducer,
  tripState: tripReducer,
  ciudadState: ciudadReducer,
  lugarState: lugarReducer,
  registroState: registroReducer,
  reservaState: reservaReducer,
  salidaState: salidaReducer,
  usuarioState: usuarioReducer,
  diaState: diaReducer,
  paisState: paisReducer,
  incluidoState: incluidoReducer,
  actividadState: actividadReducer,
  plannerState: plannerReducer,
  snackbarState: snackbarReducer,
  confirmState: confirmReducer,
  sideBarState: sideBarReducer,
  orderState: orderReducer,
  comercioState: comercioReducer,
});
