import {combineReducers} from 'redux'
import {createActions, handleActions} from 'redux-actions'

const initialState = {
  auth: localStorage && JSON.parse(localStorage['auth']),
  notification: null,
  equipment: {
    data: [],
    detailed: {},
    load: false,
    error: null,
    filter: []
  }
}

export const {
  apiRequest,
  apiFailure,
  equipmentSuccess,
  equipmentOneSuccess,
  filterEquipment,
  createEquipmentSuccess,
  removeEquipmentSuccess,
  updateEquipmentSuccess,
  showNotification,
  clearNotification,
  signIn
} = createActions({
  API_REQUEST: undefined,
  API_FAILURE: error => error,
  EQUIPMENT_SUCCESS: list => list,
  EQUIPMENT_ONE_SUCCESS: item => item,
  FILTER_EQUIPMENT: values => values,
  CREATE_EQUIPMENT_SUCCESS: obj => obj,
  REMOVE_EQUIPMENT_SUCCESS: id => id,
  UPDATE_EQUIPMENT_SUCCESS: obj => obj,
  SHOW_NOTIFICATION: obj => obj,
  CLEAR_NOTIFICATION: undefined,
  SIGN_IN: bool => bool
})

export const fetchCreateEquipment = (mirtelecomService) => (obj, callback) => (dispatch) => {
  dispatch(apiRequest())
  mirtelecomService.getCreatedEquipment(obj, callback)
    .then(data => {
      dispatch(createEquipmentSuccess(data))
      dispatch(showNotification({
        message: `Оборудование (${data.name}) успешно добавлено!`,
        intent: 'SUCCESS'
      }))
      return callback();
    })
    .catch(error => dispatch(apiFailure(error)));
}

export const fetchUpdateEquipment = (mirtelecomService) => (obj, callback) => (dispatch) => {
  dispatch(apiRequest())
  mirtelecomService.getUpdatedEquipment(obj, callback)
    .then(data => {
      dispatch(updateEquipmentSuccess(data))
      dispatch(showNotification({
        message: `Оборудование (${data.name}) успешно обновлено!`,
        intent: 'SUCCESS'
      }))
      return callback()
    })
    .catch(error => dispatch(apiFailure(error)))
}

export const fetchRemoveEquipment = (mirtelecomService) => (id, callback = () => {}) => (dispatch) => {
  dispatch(apiRequest());
  mirtelecomService.getRemovedEquipment(id)
    .then(id => {
      dispatch(removeEquipmentSuccess(id))
      dispatch(showNotification({
        message: `Оборудование было удалено.`,
        intent: 'DANGER'
      }))
      return callback()
    })
    .catch(error => dispatch(apiFailure(error)));
}

export const fetchEquipment = (mirtelecomService) => () => (dispatch) => {
  dispatch(apiRequest());
  mirtelecomService.getEquipment()
    .then(data => {
      dispatch(equipmentSuccess(data))
    })
    .catch(error => {
      dispatch(apiFailure(error))
      dispatch(showNotification({
        message: 'При загрузке данных произошла ошибка!',
        intent: 'DANGER'
      }))
    });
};

export const fetchOneEquipment = (mirtelecomService) => (id) => (dispatch) => {
  dispatch(apiRequest())
  mirtelecomService.getOneEquipment(id)
    .then(data => dispatch(equipmentOneSuccess(data)))
    .catch(error => dispatch(apiFailure(error)))
};

export const fetchSignIn = (mirtelecomService) => (obj) => (dispatch) => {
  mirtelecomService.getSignIn(obj)
    .then(data => {
      dispatch(signIn(data))
      localStorage['auth'] = data
    })
    .catch(error => console.log(error, 'err'))
}

const equipmentReducer = handleActions({
  [apiRequest]: (state, action) => ({
    ...state,
    load: true,
    error: null
  }),
  [apiFailure]: (state, {payload}) => ({
    ...state,
    load: false,
    error: payload
  }),
  [equipmentSuccess]: (state, action) => ({
    ...state,
    data: action.payload,
    load: false,
    error: null,
  }),
  [equipmentOneSuccess]: (state, action) => ({
    ...state,
    detailed: action.payload,
    load: false,
    error: null,
  }),
  [filterEquipment]: (state, action) => ({
    ...state,
    filter: action.payload
  }),
  [createEquipmentSuccess]: (state, action) => ({
    ...state,
    data: [
      ...state.data,
      action.payload
    ],
    load: false,
    error: null,
  }),
  [removeEquipmentSuccess]: (state, {payload}) => ({
    ...state,
    data: [
      ...state.data.filter(i => i.gid !== parseInt(payload))
    ],
    load: false,
    error: null,
  }),
  [updateEquipmentSuccess]: (state, {payload}) => ({
    ...state,
    data: [
      ...state.data.map(i => i.gid === payload.gid ? payload : i)
    ],
    load: false,
    error: null,
  })
}, initialState.equipment)

const authReducer = handleActions({
  [signIn]: (state, {payload}) => {
    return payload
  }
}, initialState.auth)

const notificationReducer = handleActions({
  [showNotification]: (state, {payload}) => ({
    ...state,
    message: payload.message,
    intent: payload.intent
  }),
  [clearNotification]: () => (null)
}, initialState.notification)

export default combineReducers({
  equipment: equipmentReducer,
  auth: authReducer,
  notification: notificationReducer
})