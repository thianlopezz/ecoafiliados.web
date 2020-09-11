let initialState = {
  loading: false,
  loadingList: false,
  order: {},
  orders: [],
  error: {},
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case 'ORDERS_GET':
      return { ...state, loadingList: true };
    case 'ORDERS_GET_SUCCESS':
      return {
        ...state,
        loadingList: false,
        orders: action.orders,
        lastSync: new Date(),
      };
    case 'ORDERS_GET_ERROR':
      return {
        ...state,
        loadingList: false,
        error: action.error,
        mensaje: action.mensaje,
      };
    case 'ORDER_STATE_UPDATE':
      return {
        ...state,
        loading: true,
      };
    case 'ORDER_STATE_UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        orders: [
          ...state.orders.map(order => {
            if (order.idOrden == action.order.idOrden) {
              order['estado'] = action.order.estado;
            }
            return order;
          }),
        ],
      };
    default:
      return state;
  }
}
