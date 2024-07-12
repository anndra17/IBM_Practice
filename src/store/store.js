// src/store/store.js  => it holds the entire state tree
import { configureStore } from '@reduxjs/toolkit';
import playerControllerReducer from '../reducers/index'; 


const store = configureStore({
  reducer: playerControllerReducer, 
});

export default store;