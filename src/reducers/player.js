// Action types
const SET_PLAYER_HP = "player/SET_PLAYER_HP";
const SET_PLAYER_STRENGTH = "playerC/SET_PLAYER_STRENGTH";
const DECREASE_PLAYER_HEALTH = "player/DECREASE_PLAYER_HEALTH"

// Initial state
const initialState = {
  player_hp: 3,
  player_strength: 10,
};

// Reducer
const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER_HP:
        return {...state, player_hp: action.payload};
    case SET_PLAYER_STRENGTH:
        return {...state, player_strength: action.payload};  
    case DECREASE_PLAYER_HEALTH:
        return { ...state, playerHealth: state.playerHealth - action.payload };
    default:
        return state;
  }
};

// Action creators
export const moveOpponent = (x, y, direction) => ({
  type: MOVE_OPPONENT,
  payload: { x, y, direction }
});

export const decreasePlayerHealth = (amount) => ({ type: DECREASE_PLAYER_HEALTH, payload: amount });
export const setPlayerHp = (hp) => ({ type: SET_PLAYER_HP, payload: hp });
export const setPlayerStrength = (strength) => ({ type: SET_PLAYER_STRENGTH, payload: strength });

export default playerReducer;
