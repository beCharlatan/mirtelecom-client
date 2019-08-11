import {handleActions, createActions} from 'redux-actions'
import {mirtelecomService} from '../services/mirtelecom-service'
import {showNotification} from './notification'

const initialState = {
  features: {
    equipments: {},
    substations: {},
    mufts: {},
    vok: {}
  },
  load: false,
  error: null
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

export const fetchEquipmentFeature = () => async (dispatch) => {
  try {
    dispatch(mapRequest());
    const data = await mirtelecomService.getEquipmentFeature()
    const parsedData = JSON.parse(data['equipments'])
    dispatch(equipmentFeatureSuccess(parsedData))
  } catch (error) {
    dispatch(mapFailure(error))
    dispatch(showNotification({
      message: 'При загрузке данных произошла ошибка!',
      intent: 'DANGER'
    }))
  }
}

export const fetchSubstationFeature = () => async (dispatch) => {
  try {
    dispatch(mapRequest());
    const data = await mirtelecomService.getFeature('substation')
    const parsedData = JSON.parse(data['substations'])
    dispatch(substationFeatureSuccess(parsedData))
  } catch (error) {
    dispatch(mapFailure(error))
    dispatch(showNotification({
      message: 'При загрузке данных произошла ошибка!',
      intent: 'DANGER'
    }))
  }
}

export const fetchMuftsFeature = () => async (dispatch) => {
  try {
    dispatch(mapRequest());
    const data = await mirtelecomService.getFeature('mufts')
    const parsedData = JSON.parse(data['mufts'])
    dispatch(muftsFeatureSuccess(parsedData))
  } catch (error) {
    dispatch(mapFailure(error))
    dispatch(showNotification({
      message: 'При загрузке данных произошла ошибка!',
      intent: 'DANGER'
    }))
  }
}

export const fetchVokFeature = () => async (dispatch) => {
  try {
    dispatch(mapRequest());
    const data = await mirtelecomService.getFeature('vok')
    const parsedData = JSON.parse(data['vok'])
    dispatch(vokFeatureSuccess(parsedData))
  } catch (error) {
    dispatch(mapFailure(error))
    dispatch(showNotification({
      message: 'При загрузке данных произошла ошибка!',
      intent: 'DANGER'
    }))
  }
}

export const mapReducer = handleActions({
  [mapRequest]: (state) => ({
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
}, initialState)