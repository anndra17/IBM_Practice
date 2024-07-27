// Action types
const MOVE_OPPONENT = 'opponent/MOVE_OPPONENT';
const SET_OPPONENT_DIRECTION = 'opponent/SET_OPPONENT_DIRECTION';
const SET_PLAYER_HP = "playerController/SET_PLAYER_HP";
const SET_PLAYER_STRENGTH = "playerController/SET_PLAYER_CONTROLLER";


// Initial state
const initialState = {
  x: 8,
  y: 8,
  direction: "UP",
  opponent_hp: 3,
  opponent_strength: 10,
};

// Reducer
const opponentReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_OPPONENT:
      return {
        ...state,
        x: action.payload.x,
        y: action.payload.y,
        direction: action.payload.direction
      };
    case SET_PLAYER_HP:
        return {...state, opponent_hp: action.payload};
    case SET_PLAYER_STRENGTH:
        return {...state, opponent_strength: action.payload}; 
    default:
      return state;
  }
};

// Action creators
export const moveOpponent = (x, y, direction) => ({
  type: MOVE_OPPONENT,
  payload: { x, y, direction }
});
export const setOpponentHp = (opponent_hp) => ({ type: SET_OPPONENT_HP, payload: opponent_hp });
export const setOpponentStrength = (opponent_strength) => ({ type: SET_OPPONENT_STRENGTH, payload: opponent_strength });

export default opponentReducer;
