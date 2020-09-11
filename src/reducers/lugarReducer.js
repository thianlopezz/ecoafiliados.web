let initialState = {
  loading: false,
  loadingList: false,
  lugar: {},
  lugares: [],
  error: {},
};

export default function lugarReducer(state = initialState, action) {
  switch (action.type) {
    case 'LUGARES_GET':
      return { ...state, loadingList: true };
    case 'LUGARES_GET_SUCCESS':
      return { ...state, loadingList: false, lugares: action.lugares };
    case 'LOAD_LUGAR_BY_ID':
      return { ...state, loading: true };
    case 'LOAD_LUGAR_BY_ID_SUCCESS':
      return { ...state, loading: false, lugar: action.lugar };
    // LEGACY
    case 'CREATE_LUGAR':
      return {
        ...state,
        loading: true,
      };
    case 'CREATE_LUGAR_SUCCESS':
      return {
        ...state,
        loading: false,
        lugares: [...state.lugares, action.lugar],
      };
    case 'UPDATE_LUGAR':
      return {
        ...state,
        loading: true,
      };
    case 'UPDATE_LUGAR_SUCCESS':
      return {
        ...state,
        lugares: [...replaceArrayLugar(state, action.lugar)],
      };
    case 'DELETE_LUGAR':
      return { ...state, loading: true };
    case 'DELETE_LUGAR_SUCCESS':
      return {
        ...state,
        loading: false,
        lugares: [...state.filter(x => x.idLugar !== action.lugar.idLugar)],
      };
    default:
      return state;
  }

  function replaceArrayLugar(state, lugar) {
    let index = state.findIndex(x => x.idLugar === lugar.idLugar);
    let arr = Object.assign([], state);
    arr[index] = lugar;
    return arr;
  }
}
