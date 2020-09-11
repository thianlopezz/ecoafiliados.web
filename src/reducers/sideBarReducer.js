let initialState = {
  isLeftSideBarOpen: false,
};

export default function sideBarReducer(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_LEFT_SIDEBAR':
      return { ...state, isLeftSideBarOpen: true };
    case 'CLOSE_LEFT_SIDEBAR':
      return { ...state, isLeftSideBarOpen: false };
    default:
      return state;
  }
}
