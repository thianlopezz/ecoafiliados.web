let initialState = {
  loading: false,
  loadingList: false,
  reserva: {},
  reservas: [],
  error: {},
};

export default function reservaReducer(state = initialState, action) {
  switch (action.type) {
    case 'RESERVA_CHANGE':
      return { ...state, reserva: { ...action.reserva } };
    case 'RESERVA_SAVE':
      return { ...state, loading: true };
    case 'RESERVA_SAVE_SUCCESS':
      return { ...state, loading: false, error: false };
    case 'RESERVA_SAVE_ERROR':
      return {
        ...state,
        loading: false,
        error: { ...action.error },
        mensaje: action.error.mensaje,
        // setErrors(state.reserva, action.error)
      };
    case 'RESERVA_DELETE':
      return { ...state, loading: true };
    case 'RESERVA_DELETE_SUCCESS':
      return { ...state, loading: false };
    case 'RESERVA_DELETE_ERROR':
      return {
        ...state,
        loading: false,
        error: { ...action.error },
        mensaje: action.error.mensaje,
      };
    default:
      return state;
  }
}

const setErrors = (reserva, error) => {
  if (error) {
    reserva.error = error;
    return reserva;
  } else {
    return reserva;
  }
};
