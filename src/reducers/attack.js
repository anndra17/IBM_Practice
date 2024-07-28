// Action Types
const ATTACK = 'attack/ATTACK';
const RESET_ATTACK = 'attack/RESET_ATTACK';
const SET_BACKGROUND_COLOR = 'attack/SET_BACKGROUND_COLOR';
const SET_ATTACK_PHASE = 'attack/SET_ATTACK_PHASE';

// Initial State
const initialState = {
  isAttacking: false,
  statusBackgroundColor: 'white',
  isAttackPhase: false
};

// Reducer
const attackReducer = (state = initialState, action) => {
  switch (action.type) {
    case ATTACK:
      return { ...state, isAttacking: true };
    case RESET_ATTACK:
      return { ...state, isAttacking: false };
    case SET_BACKGROUND_COLOR:
      return { ...state, statusBackgroundColor: action.payload };
    case SET_ATTACK_PHASE:
      return { ...state, isAttackPhase: action.payload };
    default:
      return state;
  }
};

// Action Creators
export const attack = () => ({ type: ATTACK });
export const resetAttack = () => ({ type: RESET_ATTACK });
export const setBackgroundColor = (color) => ({ type: SET_BACKGROUND_COLOR, payload: color });
export const setAttackPhase = (isPhase) => ({ type: SET_ATTACK_PHASE, payload: isPhase });

export default attackReducer;
