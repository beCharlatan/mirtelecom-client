import {handleActions, createActions} from 'redux-actions'
//import {mirtelecomService} from '../services/mirtelecom-service'
import {dummyService as mirtelecomService} from '../services/dummy-service'

if (!('auth' in localStorage)) {
  localStorage['auth'] = JSON.stringify(false)
}

const initialState = localStorage.auth && JSON.parse(localStorage['auth'])

export const authStatus = state => state.auth

export const {
  signIn
} = createActions({
  SIGN_IN: bool => bool
})

export const fetchSignIn = (obj) => async (dispatch) => {
  try {
    const data = await mirtelecomService.getSignIn(obj)
    dispatch(signIn(data))
    localStorage['auth'] = JSON.stringify(data) 
  } catch (error) {
    console.log(error)
  }
}

export const authReducer = handleActions({
  [signIn]: (state, {payload}) => {
    return payload
  }
}, initialState)