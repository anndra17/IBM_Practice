// src/reducers/index.js  => responsible for updating the state based on the action’s type and payload
const initialState = {
  x: 4,
  y: 4
};

const playerControllerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DOWN":
      return { ...state, y: Math.max(state.y - 1, 1) }; ///...state imi creaza o copie a stari curente si modifica doar anumite proprietati
    case "UP":
      return { ...state, y: Math.min(state.y + 1, 8) };
    case "LEFT":
      return { ...state, x: Math.max(state.x - 1, 1) };
    case "RIGHT":
      return { ...state, x: Math.min(state.x + 1, 8) };
    default:
      return state;
  }
};

export default playerControllerReducer;
