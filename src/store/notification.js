import {handleActions, createActions} from 'redux-actions'

const initialState = null

export const {
  showNotification,
  clearNotification
} = createActions({
  SHOW_NOTIFICATION: obj => obj,
  CLEAR_NOTIFICATION: undefined
})


export const notificationReducer = handleActions({
  [showNotification]: (state, {payload}) => ({
    ...state,
    message: payload.message,
    intent: payload.intent
  }),
  [clearNotification]: () => (null)
}, initialState)