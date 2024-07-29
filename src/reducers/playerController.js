// Duck Pattern - grouped reducer, actions and creators in the same file

// import { START_ATTACK, STOP_ATTACK } from "../actions/attackActions";

// Types (actiuni)
const MOVE_UP = "playerController/MOVE_UP";
const MOVE_DOWN = "playerController/MOVE_DOWN";
const MOVE_LEFT = "playerController/MOVE_LEFT";
const MOVE_RIGHT = "playerController/MOVE_RIGHT";
const SET_NPC_MOVABLE = "playerController/SET_NPC_MOVABLE";


// Stare initiala
const initialState = {
  x: 4,
  y: 4,
  direction: "UP", 
  isNpcMovable: true,
  isAttacking: false, // Added state to track attack status

};

// Reducer
const playerControllerReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_UP:
      if (!state.isNpcMovable) return state; // Nu permite mișcarea dacă NPC-ul nu este mișcabil
      return { ...state, y: Math.max(state.y - 1, 1), direction: "UP" };
    case MOVE_DOWN:
      if (!state.isNpcMovable) return state; // Nu permite mișcarea dacă NPC-ul nu este mișcabil
      return { ...state, y: Math.min(state.y + 1, 8), direction: "DOWN" };
    case MOVE_LEFT:
      if (!state.isNpcMovable) return state; // Nu permite mișcarea dacă NPC-ul nu este mișcabil
      return { ...state, x: Math.max(state.x - 1, 1), direction: "LEFT" };
    case MOVE_RIGHT:
      if (!state.isNpcMovable) return state; // Nu permite mișcarea dacă NPC-ul nu este mișcabil
      return { ...state, x: Math.min(state.x + 1, 8), direction: "RIGHT" };
    case SET_NPC_MOVABLE:
      return { ...state, isNpcMovable: action.payload };
   default:
      return state;
  }
};

// Action Creators (creatori de acțiuni)
export const moveUp = () => ({ type: MOVE_UP });
export const moveDown = () => ({ type: MOVE_DOWN });
export const moveLeft = () => ({ type: MOVE_LEFT});
export const moveRight = () => ({ type: MOVE_RIGHT});
export const setNpcMovable = (isMovable) => ({ type: SET_NPC_MOVABLE, payload: isMovable});


export default playerControllerReducer;