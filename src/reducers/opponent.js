// Action types
const MOVE_OPPONENT = 'opponent/MOVE_OPPONENT';
const SET_OPPONENT_HP = "playerController/SET_OPPONENT_HP";
const SET_OPPONENT_STRENGTH = "playerController/SET_OPPONENT_CONTROLLER";
const DECREASE_OPPONENT_HEALTH = "playerController/DECREASE_OPPONENT_HEALTH";


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
    case SET_OPPONENT_HP:
        return {...state, opponent_hp: action.payload};
    case SET_OPPONENT_STRENGTH:
        return {...state, opponent_strength: action.payload}; 
    case DECREASE_OPPONENT_HEALTH:
      return {...state, opponent_hp: state.opponent_hp - action.payload};
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
export const decreaseOpponentHealth = (amount) => ({ type: DECREASE_OPPONENT_HEALTH, payload: amount });

export default opponentReducer;
