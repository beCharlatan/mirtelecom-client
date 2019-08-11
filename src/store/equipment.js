import { handleActions, createActions } from 'redux-actions'
import { createSelector } from 'reselect'
import { lazyFilter } from '../utils'
import { mirtelecomService } from '../services/mirtelecom-service'
import { mapRequest, mapFailure } from './map'
import { showNotification } from './notification'

const initialState = {
  data: [],
  // detailed: {},
  load: false,
  error: null,
  filter: []
}

export const getState = state => state.equipment
export const getDataArray = state => state.equipment.data
export const getFilter = state => state.equipment.filter
export const getFilteredData = createSelector(
  [getDataArray, getFilter],
  (data, filter) => lazyFilter(data, filter)
)
export const getEquipmentItem = (state, id) => {
  return state.equipment.data.find(i => i.id === +id)
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
  locateEquipmentSuccess
} = createActions({
  API_REQUEST: undefined,
  API_FAILURE: error => error,
  EQUIPMENT_SUCCESS: list => list,
  EQUIPMENT_ONE_SUCCESS: item => item,
  FILTER_EQUIPMENT: values => values,
  CREATE_EQUIPMENT_SUCCESS: obj => obj,
  REMOVE_EQUIPMENT_SUCCESS: id => id,
  UPDATE_EQUIPMENT_SUCCESS: obj => obj,
  LOCATE_EQUIPMENT_SUCCESS: obj => obj
})

export const fetchCreateEquipment = (obj, callback) => async (dispatch) => {
  try {
    dispatch(apiRequest())
    const data = await mirtelecomService.getCreatedEquipment(obj, callback)
    dispatch(createEquipmentSuccess(data))
    dispatch(showNotification({
      message: `Оборудование (${data.name}) успешно добавлено!`,
      intent: 'SUCCESS'
    }))
    return callback()
  } catch (error) {
    dispatch(apiFailure(error))
  }
}

export const fetchUpdateEquipment = (obj, callback) => async (dispatch) => {
  try {
    dispatch(apiRequest())
    const data = await mirtelecomService.getUpdatedEquipment(obj, callback)
    dispatch(updateEquipmentSuccess(data))
    dispatch(showNotification({
      message: `Оборудование (${data.name}) успешно обновлено!`,
      intent: 'SUCCESS'
    }))
    return callback()
  } catch (error) {
    dispatch(apiFailure(error))
  }
}

export const fetchLocateEquipment = (obj) => async (dispatch) => {
  try {
    dispatch(mapRequest())
    const data = await mirtelecomService.getLocateEquipment(obj)
    dispatch(locateEquipmentSuccess(data))
    dispatch(showNotification({
      message: `Оборудование (${obj.id}) успешно обновлено!`,
      intent: 'SUCCESS'
    }))
    dispatch(mapFailure(null))
  } catch (error) {
    dispatch(apiFailure(error))
  }
}

export const fetchGeocodeEquipment = (obj) => async (dispatch) => {
  try {
    dispatch(mapRequest())
    const data = await mirtelecomService.getGeocodeEquipment(obj)
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        data[prop] = +data[prop]
      }
    }
    console.log(data)
    dispatch(locateEquipmentSuccess(data))
    dispatch(showNotification({
      message: `Геокодер успешно завершил свою работу!`,
      intent: 'SUCCESS'
    }))
  } catch (error) {
    dispatch(apiFailure(error))
  }
}

export const fetchRemoveEquipment = (id, callback = () => {}) => async (dispatch) => {
  try {
    dispatch(apiRequest())
    const data = await mirtelecomService.getRemovedEquipment(id)
    dispatch(removeEquipmentSuccess(data))
    dispatch(showNotification({
      message: `Оборудование было удалено.`,
      intent: 'DANGER'
    }))
    return callback()
  } catch (error) {
    dispatch(apiFailure(error))
  }
}

export const fetchEquipment = () => async (dispatch) => {
  try {
    dispatch(apiRequest());
    const data = await mirtelecomService.getEquipment()
    dispatch(equipmentSuccess(data))
  } catch (error) {
    dispatch(apiFailure(error))
    dispatch(showNotification({
      message: 'При загрузке данных произошла ошибка!',
      intent: 'DANGER'
    }))
  }
}

// export const fetchOneEquipment = (id) => async (dispatch) => {
//   try {
//     dispatch(apiRequest())
//     const data = await mirtelecomService.getOneEquipment(id)
//     dispatch(equipmentOneSuccess(data))
//   } catch (error) {
//     dispatch(apiFailure(error))
//     dispatch(showNotification({
//       message: 'При загрузке данных произошла ошибка!',
//       intent: 'DANGER'
//     }))
//   }
// }

export const equipmentReducer = handleActions({
  [apiRequest]: (state) => ({
    ...state,
    load: true,
    error: null
  }),
  [apiFailure]: (state, { payload }) => ({
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
  // [equipmentOneSuccess]: (state, action) => ({
  //   ...state,
  //   detailed: action.payload,
  //   load: false,
  //   error: null,
  // }),
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
  [removeEquipmentSuccess]: (state, { payload }) => ({
    ...state,
    data: [
      ...state.data.filter(i => i.id !== parseInt(payload))
    ],
    load: false,
    error: null,
  }),
  [locateEquipmentSuccess]: (state, { payload }) => ({
    ...state,
    data: [
      ...state.data.map(i => i.id === payload.id ? { ...i, geom: payload.coords } : i)
    ],
    load: false,
    error: null,
  }),
  [updateEquipmentSuccess]: (state, { payload }) => ({
    ...state,
    data: [
      ...state.data.map(i => i.id === payload.id ? payload : i)
    ],
    load: false,
    error: null,
  })
}, initialState)