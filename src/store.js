import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducer from './redux'

const logMiddleware = ({ getState }) => (next) => (action) => {
  console.log(action.type, getState());
  return next(action);
};

const store = createStore(reducer, 
  applyMiddleware(thunk, logMiddleware));

export default store;