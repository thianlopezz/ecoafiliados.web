let initialState = {
  loading: false,
  loadingList: false,
  incluido: {},
  incluidos: [],
  error: {},
};

export default function incluidoReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCLUIDOS_GET':
      return { ...state, loadingList: true };
    case 'INCLUIDOS_GET_SUCCESS':
      return { ...state, loadingList: false, incluidos: [...action.incluidos] };
    case 'INCLUIDOS_GET_ERROR':
      return {
        ...state,
        loadingList: false,
        error: action.error,
        mensaje: action.mensaje,
      };
    default:
      return state;
  }
}
