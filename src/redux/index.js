import {combineReducers} from 'redux'
import {createActions, handleActions} from 'redux-actions'

const initialState = {
  map: {
    features: {
      equipments: {},
      substations: {},
      mufts: {},
      vok: {}
    },
    load: false,
    error: null
  },
  auth: localStorage && JSON.parse(localStorage['auth']),
  notification: null,
  equipment: {
    data: [],
    detailed: {},
    load: false,
    error: null,
    filter: []
  },
  options: {
    equipmentTable: {
      defaultPageSize: 25,
      pageSizeOptions: [10, 20, 25, 50],
      showPaginationTop: false,
      resizable: true,
      shownFields: [
        'name',
        'address',
        'equipment',
        'status',
        'ip',
        'sn',
        'note'
      ]
    }
  }
}

export const {
  mapRequest,
  mapFailure,
  equipmentFeatureSuccess,
  substationFeatureSuccess,
  muftsFeatureSuccess,
  vokFeatureSuccess,
} = createActions({
  MAP_REQUEST: undefined,
  MAP_FAILURE: error => error,
  EQUIPMENT_FEATURE_SUCCESS: feature => feature,
  SUBSTATION_FEATURE_SUCCESS: feature => feature,
  MUFTS_FEATURE_SUCCESS: feature => feature,
  VOK_FEATURE_SUCCESS: feature => feature,
})

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
  dispatch(apiRequest())
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
    })
}

export const fetchEquipmentFeature = (mirtelecomService) => () => (dispatch) => {
  dispatch(mapRequest());
  mirtelecomService.getEquipmentFeature()
    .then(data => {
      data = JSON.parse(data['equipments'])
      dispatch(equipmentFeatureSuccess(data))
    })
    .catch(error => {
      dispatch(mapFailure(error))
      dispatch(showNotification({
        message: 'При загрузке данных произошла ошибка!',
        intent: 'DANGER'
      }))
    })
}

export const fetchSubstationFeature = (mirtelecomService) => () => (dispatch) => {
  dispatch(mapRequest());
  mirtelecomService.getFeature('substation')
    .then(data => {
      data = JSON.parse(data['substations'])
      dispatch(substationFeatureSuccess(data))
    })
    .catch(error => {
      dispatch(mapFailure(error))
      dispatch(showNotification({
        message: 'При загрузке данных произошла ошибка!',
        intent: 'DANGER'
      }))
    })
}

export const fetchMuftsFeature = (mirtelecomService) => () => (dispatch) => {
  dispatch(mapRequest());
  mirtelecomService.getFeature('mufts')
    .then(data => {
      data = JSON.parse(data['mufts'])
      dispatch(muftsFeatureSuccess(data))
    })
    .catch(error => {
      dispatch(mapFailure(error))
      dispatch(showNotification({
        message: 'При загрузке данных произошла ошибка!',
        intent: 'DANGER'
      }))
    })
}

export const fetchVokFeature = (mirtelecomService) => () => (dispatch) => {
  dispatch(mapRequest());
  mirtelecomService.getFeature('vok')
    .then(data => {
      data = JSON.parse(data['vok'])
      dispatch(vokFeatureSuccess(data))
    })
    .catch(error => {
      dispatch(mapFailure(error))
      dispatch(showNotification({
        message: 'При загрузке данных произошла ошибка!',
        intent: 'DANGER'
      }))
    })
}

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
      ...state.data.filter(i => i.id !== parseInt(payload))
    ],
    load: false,
    error: null,
  }),
  [updateEquipmentSuccess]: (state, {payload}) => ({
    ...state,
    data: [
      ...state.data.map(i => i.id === payload.id ? payload : i)
    ],
    load: false,
    error: null,
  })
}, initialState.equipment)

const mapReducer = handleActions({
  [mapRequest]: (state, action) => ({
    ...state,
    load: true,
    error: null
  }),
  [mapFailure]: (state, {payload}) => ({
    ...state,
    load: false,
    error: payload
  }),
  [equipmentFeatureSuccess]: (state, {payload}) => ({
    ...state,
    features: {
      ...state.features,
      equipments: payload
    },
    load: false,
    error: null,
  }),
  [substationFeatureSuccess]: (state, {payload}) => ({
    ...state,
    features: {
      ...state.features,
      substations: payload
    },
    load: false,
    error: null,
  }),
  [muftsFeatureSuccess]: (state, {payload}) => ({
    ...state,
    features: {
      ...state.features,
      mufts: payload
    },
    load: false,
    error: null,
  }),
  [vokFeatureSuccess]: (state, {payload}) => ({
    ...state,
    features: {
      ...state.features,
      vok: payload
    },
    load: false,
    error: null,
  }),
}, initialState.map)

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

const optionsReducer = handleActions({}, initialState.options)

export default combineReducers({
  map: mapReducer,
  equipment: equipmentReducer,
  auth: authReducer,
  notification: notificationReducer,
  options: optionsReducer
})