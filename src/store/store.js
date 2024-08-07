// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import playerControllerReducer from '../reducers/playerController';
import opponentReducer from '../reducers/opponent';
import modalReducer from '../reducers/modalSlice';
import attackReducer from '../reducers/attack';
import playerReducer from '../reducers/player';


// Combinare reduceri
const rootReducer = combineReducers({
  playerController: playerControllerReducer,
  player: playerReducer,
  opponent: opponentReducer,
  modal: modalReducer,
  attack: attackReducer,
});

// Configurarea store-ului cu rootReducer
const store = configureStore({
  reducer: rootReducer,
});

export default store;
