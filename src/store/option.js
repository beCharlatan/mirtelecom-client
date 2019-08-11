import {createActions, handleActions} from 'redux-actions'

if (!('equipmentTableOptions' in localStorage)) {
  localStorage['equipmentTableOptions'] = JSON.stringify({
    pageSize: 21,
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
  })
}

const initialState = {
  equipmentTable: localStorage.equipmentTableOptions &&
    JSON.parse(localStorage['equipmentTableOptions']),
  map: {
    selectedItem: null
  }
}

export const {
  changeOptions,
} = createActions({
  CHANGE_OPTIONS: ({options, optionsType}) => {
    return {
      options: options,
      optionsType: optionsType
    }
  }
})

export const optionReducer = handleActions({
  [changeOptions]: (state, {payload}) => {
    return {
      ...state,
      [payload.optionsType]: Object.assign({}, payload.options)
    }
  }
}, initialState)