let initialState = {
  loading: false,
  loadingList: false,
  comercio: {},
  comercios: [],
  error: {},
};

export default function comercioReducer(state = initialState, action) {
  switch (action.type) {
    case 'COMERCIO_GET_BY_ID':
      return { ...state, loadingList: true };
    case 'COMERCIO_GET_BY_ID_SUCCESS':
      return {
        ...state,
        loadingList: false,
        comercio: action.comercio,
        lastSync: new Date(),
      };
    case 'COMERCIO_GET_BY_ID_ERROR':
      return {
        ...state,
        loadingList: false,
        error: action.error,
        mensaje: action.mensaje,
      };
    case 'COMERCIO_OPEN_UPDATE':
      return {
        ...state,
        loading: true,
      };
    case 'COMERCIO_OPEN_UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        comercio: {
          ...state.comercio,
          isOpen: state.comercio.isOpen == 1 ? 0 : 1,
        },
      };
    case 'COMERCIO_OPEN_UPDATE_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
        mensaje: action.mensaje,
      };
    default:
      return state;
  }
}
