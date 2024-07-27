// src/reducers/modalSlice.js

// Action Types
const SHOW_MODAL = 'modal/SHOW_MODAL';
const HIDE_MODAL = 'modal/HIDE_MODAL';


// Initial State
const initialState = {
  showModal: false,
};

// Reducer
const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, showModal: true };
    case HIDE_MODAL:
      return { ...state, showModal: false };
    default:
      return state;
  }
};

// Action Creators
export const showModal = () => ({ type: SHOW_MODAL });
export const hideModal = () => ({ type: HIDE_MODAL });


export default modalReducer;
