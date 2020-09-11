let initialState = {
  loading: false,
  isOpen: false,
  config: {},
};

export default function confirmReducer(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_CONFIRM':
      return { ...state, isOpen: true, config: action.config };
    case 'CLOSE_CONFIRM':
      return { ...state, isOpen: false };
    case 'LOADING_CONFIRM':
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}
