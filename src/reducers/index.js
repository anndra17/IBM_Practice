const initialState = {
  x: 1,
  y: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_RED_DOT_POSITION':
      return {
        ...state,
        x: action.payload.x,
        y: action.payload.y,
      };
    default:
      return state;
  }
};

export default rootReducer;
