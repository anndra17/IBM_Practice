const initialState = {
  x: 4,
  y: 4,
  hp: 3,
  strength: 10,
  direction: "UP" // Initial direction
};

const playerControllerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DOWN":
      return { ...state, y: Math.max(state.y - 1, 1), direction: "DOWN" };
    case "UP":
      return { ...state, y: Math.min(state.y + 1, 8), direction: "UP" };
    case "LEFT":
      return { ...state, x: Math.max(state.x - 1, 1), direction: "LEFT" };
    case "RIGHT":
      return { ...state, x: Math.min(state.x + 1, 8), direction: "RIGHT" };
    default:
      return state;
  }
};

export default playerControllerReducer;
