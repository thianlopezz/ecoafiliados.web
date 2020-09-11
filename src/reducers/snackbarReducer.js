let defaultState = {
  open: false,
};

const snackbarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_SNACKBAR':
      return {
        ...state,
        open: true,
        mensaje: action.mensaje,
        time: action.time,
        variant: action.variant,
      };
    case 'CLOSE_SNACKBAR':
      return {
        ...state,
        open: false,
      };
    default:
      return { ...state };
  }
};

export default snackbarReducer;
