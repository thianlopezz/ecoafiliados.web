let initialState = {
  loading: false,
  loadingList: false,
  trip: {},
  trips: [],
};

// EN ESTE REDUCER SE MANEJARAN LOS PLANES QUE TIENE EL VIAJERO
export default function tripReducer(state = initialState, action) {
  switch (action.type) {
    case 'TRIP_CHANGE':
      return { ...state, trip: { ...action.trip } };
    case 'TRIP_GET_BY_USUARIO':
      return { ...state, loadingList: true, error: undefined };
    case 'TRIP_GET_BY_PLANNER':
      return { ...state, loadingList: true, error: undefined };
    case 'TRIP_GET_SUCCESS':
      return {
        ...state,
        loadingList: false,
        loading: false,
        trips: [...action.trips],
        lastSync: new Date(),
      };
    case 'TRIP_GET_ERROR':
      return {
        ...state,
        loadingList: false,
        mensaje: action.mensaje,
        error: action.error,
      };
    case 'TRIP_GET_BY_ID':
      return { ...state, loadingList: true, error: undefined };
    case 'TRIP_GET_BY_ID_SUCCESS':
      return {
        ...state,
        loadingList: false,
        trip: { ...action.trip, lastSync: new Date() },
        trips: [...replaceArrayTrips(state.trips, action.trip)],
      };
    case 'TRIP_PLAN_GET':
      return { ...state, loadingList: true, error: undefined };
    case 'TRIP_PLAN_GET_SUCCESS':
      return {
        ...state,
        loadingList: false,
        trip: { ...action.trip, lastSync: new Date() },
      };
    case 'TRIP_SAVE':
      return { ...state, loading: true, error: undefined };
    case 'TRIP_SAVE_SUCCESS':
      return { ...state, loading: false, trips: [...state.trips, action.trip] };
    case 'TRIP_SAVE_ERROR':
      return {
        ...state,
        loading: false,
        mensaje: action.mensaje,
        error: action.error,
      };
    case 'TRIP_UPDATE':
      return { ...state, loading: true, error: undefined };
    case 'TRIP_UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        trips: [...replaceArrayTrips(state.trips, action.trip)],
      };
    case 'TRIP_UPDATE_ERROR':
      return {
        ...state,
        loading: false,
        mensaje: action.mensaje,
        error: action.error,
      };
    case 'TRIP_DELETE':
      return { ...state, loading: true, error: undefined };
    case 'TRIP_DELETE_SUCCESS':
      return {
        ...state,
        loading: false,
        trips: [
          ...state.trips.filter(trip => trip.idSalida != action.idSalida),
        ],
      };
    case 'TRIP_DELETE_ERROR':
      return {
        ...state,
        loading: false,
        mensaje: action.mensaje,
        error: action.error,
      };
    default:
      return state;
  }

  function replaceArrayTrips(state, trip) {
    let index = state.findIndex(x => x.idSalida === trip.idSalida);
    let arr = Object.assign([], state);
    arr[index] = trip;
    return arr;
  }
}
