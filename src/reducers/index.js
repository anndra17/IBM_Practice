import { START_ATTACK, STOP_ATTACK } from "./../actions/attackActions";


const initialState = {
  x: 4,
  y: 4,
  player_hp: 3,
  player_strength: 10,
  opponent_hp: 3,
  opponent_strength: 10,
  direction: "UP", 
  isNpcMovable: true,
  isAttacking: false, // Added state to track attack status

};

const playerControllerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DOWN":
      if (!state.isNpcMovable) return state; // Nu permite mișcarea dacă NPC-ul nu este mișcabil
      return { ...state, y: Math.max(state.y - 1, 1), direction: "DOWN" };
    case "UP":
      if (!state.isNpcMovable) return state; // Nu permite mișcarea dacă NPC-ul nu este mișcabil
      return { ...state, y: Math.min(state.y + 1, 8), direction: "UP" };
    case "LEFT":
      if (!state.isNpcMovable) return state; // Nu permite mișcarea dacă NPC-ul nu este mișcabil
      return { ...state, x: Math.max(state.x - 1, 1), direction: "LEFT" };
    case "RIGHT":
      if (!state.isNpcMovable) return state; // Nu permite mișcarea dacă NPC-ul nu este mișcabil
      return { ...state, x: Math.min(state.x + 1, 8), direction: "RIGHT" };
    case "SET_NPC_MOVABLE":
      return { ...state, isNpcMovable: action.payload };
    case START_ATTACK:
      return { ...state, isAttacking: true };
    case STOP_ATTACK:
      return { ...state, isAttacking: false };
    default:
      return state;
  }
};

export default playerControllerReducer;
