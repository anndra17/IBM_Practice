// attackDuck.js

// Action Types
const ATTACK = 'attack/ATTACK';
const RESET_ATTACK = 'attack/RESET_ATTACK';

// Initial State
const initialState = {
  isAttacking: false,
};

// Reducer
const attackReducer = (state = initialState, action) => {
  switch (action.type) {
    case ATTACK:
      return { ...state, isAttacking: true };
    case RESET_ATTACK:
      return { ...state, isAttacking: false };
    default:
      return state;
  }
};

// Action Creators
export const attack = () => ({ type: ATTACK });
export const resetAttack = () => ({ type: RESET_ATTACK });

// Selectors
export const selectIsAttacking = (state) => state.attack.isAttacking;

export default attackReducer;
