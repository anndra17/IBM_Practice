// Action Types
const ATTACK = 'attack/ATTACK';
const RESET_ATTACK = 'attack/RESET_ATTACK';
const SET_BACKGROUND_COLOR = 'attack/SET_BACKGROUND_COLOR';
const SET_ATTACK_PHASE = 'attack/SET_ATTACK_PHASE';
const SET_ATTACK_TIMER_STARTED = 'attack/SET_ATTACK_TIMER_STARTED';
const SET_OPPONENT_STATUS_COLOR = 'attack/SET_OPPONENT_STATUS_COLOR';
const SET_TURN = 'attack/SET_TURN';



// Initial State
const initialState = {
  isAttacking: false,
  statusBackgroundColor: 'white',
  isAttackPhase: false,
  attackTimerStarted: false,
  opponentStatusColor: 'white',
  currentTurn: 'player',
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
    case SET_ATTACK_TIMER_STARTED:
        return { ...state, attackTimerStarted: action.payload };
    case SET_OPPONENT_STATUS_COLOR:
        return { ...state, opponentStatusColor: action.payload };
    case SET_TURN:
        return { ...state, currentTurn: action.payload };
        default:
      return state;
  }
};

// Action Creators
export const attack = () => ({ type: ATTACK });
export const resetAttack = () => ({ type: RESET_ATTACK });
export const setBackgroundColor = (color) => ({ type: SET_BACKGROUND_COLOR, payload: color });
export const setAttackPhase = (isPhase) => ({ type: SET_ATTACK_PHASE, payload: isPhase });
export const setAttackTimerStarted = (started) => ({ type: SET_ATTACK_TIMER_STARTED, payload: started });
export const setOpponentStatusColor = (color) => ({type: SET_OPPONENT_STATUS_COLOR, payload: color});  
export const setTurn = (turn) => ({ type: SET_TURN, payload: turn });


export default attackReducer;
