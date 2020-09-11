import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers/index';
import watcherSaga from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
let store;

//es te no va
store = createStore(reducers, compose(applyMiddleware(sagaMiddleware)));
//este va
// if (!process.env.NODE_ENV) {
//   store = createStore(reducers, compose(applyMiddleware(sagaMiddleware)));
// } else {
//   store = createStore(
//     reducers,
//     compose(
//       applyMiddleware(sagaMiddleware),
//       reduxDevTools
//     )
//   );
// }

sagaMiddleware.run(watcherSaga);

export default store;
