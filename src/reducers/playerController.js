import maps from "../assets/maps.js";

// Action types
const MOVE_UP = "playerController/MOVE_UP";
const MOVE_DOWN = "playerController/MOVE_DOWN";
const MOVE_LEFT = "playerController/MOVE_LEFT";
const MOVE_RIGHT = "playerController/MOVE_RIGHT";
const SET_NPC_MOVABLE = "playerController/SET_NPC_MOVABLE";
const SET_CURRENT_MAP = 'playerController/SET_CURRENT_MAP';

// Initial state
const initialState = {
  x: 4,
  y: 4,
  direction: "UP",
  isNpcMovable: true,
  isAttacking: false, // Added state to track attack status
  currentMap: 'map1',
};

// Reducer
const playerControllerReducer = (state = initialState, action) => {
  let newX = state.x;
  let newY = state.y;
  const mapMatrix = maps[state.currentMap]; // Use state.currentMap to access the current map

  switch (action.type) {
    case MOVE_UP:
      if (state.isNpcMovable) {
        newY = Math.max(state.y - 1, 1);
        if (mapMatrix[newY][state.x] !== 1) {
          return { ...state, y: newY, direction: "UP" };
        }
      }
      return state;

    case MOVE_DOWN:
      if (state.isNpcMovable) {
        newY = Math.min(state.y + 1, 8);
        if (mapMatrix[newY][state.x] !== 1) {
          return { ...state, y: newY, direction: "DOWN" };
        }
      }
      return state;

    case MOVE_LEFT:
      if (state.isNpcMovable) {
        newX = Math.max(state.x - 1, 1);
        if (mapMatrix[state.y][newX] !== 1) {
          return { ...state, x: newX, direction: "LEFT" };
        }
      }
      return state;

    case MOVE_RIGHT:
      if (state.isNpcMovable) {
        newX = Math.min(state.x + 1, 8);
        if (mapMatrix[state.y][newX] !== 1) {
          return { ...state, x: newX, direction: "RIGHT" };
        }
      }
      return state;

    case SET_NPC_MOVABLE:
      return { ...state, isNpcMovable: action.payload };

    case SET_CURRENT_MAP:
      return { ...state, currentMap: action.payload };
      
    default:
      return state;
  }
};

// Action Creators
export const moveUp = () => ({ type: MOVE_UP });
export const moveDown = () => ({ type: MOVE_DOWN });
export const moveLeft = () => ({ type: MOVE_LEFT });
export const moveRight = () => ({ type: MOVE_RIGHT });
export const setNpcMovable = (isMovable) => ({ type: SET_NPC_MOVABLE, payload: isMovable });
export const setCurrentMap = (currentMap) => ({ type: SET_CURRENT_MAP, payload: currentMap });

export default playerControllerReducer;
