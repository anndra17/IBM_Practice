// src/reducers/index.js  => responsible for updating the state based on the action’s type and payload
const initialState = {
  x: 4,
  y: 4
};

const playerControllerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DOWN":
      return { ...state, y: Math.max(state.y - 1, 0) };
    case "UP":
      return { ...state, y: Math.min(state.y + 1, 9) };
    case "LEFT":
      return { ...state, x: Math.max(state.x - 1, 0) };
    case "RIGHT":
      return { ...state, x: Math.min(state.x + 1, 9) };
    default:
      return state;
  }
};

export default playerControllerReducer;
