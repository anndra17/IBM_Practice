// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import playerControllerReducer from '../reducers/playerController';
import opponentReducer from '../reducers/opponent';
import modalReducer from '../reducers/modalSlice';

// Combinare reduceri
const rootReducer = combineReducers({
  playerController: playerControllerReducer,
  opponent: opponentReducer,
  modal: modalReducer,
});

// Configurarea store-ului cu rootReducer
const store = configureStore({
  reducer: rootReducer,
});

export default store;
