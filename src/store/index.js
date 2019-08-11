import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import {authReducer} from './auth'
import {equipmentReducer} from './equipment'
import {mapReducer} from './map'
import {notificationReducer} from './notification'
import {optionReducer} from './option'

const rootReducer = combineReducers({
  map: mapReducer,
  equipment: equipmentReducer,
  auth: authReducer,
  notification: notificationReducer,
  options: optionReducer
})

const logMiddleware = ({ getState }) => (next) => (action) => {
  console.log(action.type, getState())
  return next(action)
};

const store = createStore(rootReducer, 
  applyMiddleware(thunk, logMiddleware))

export default store