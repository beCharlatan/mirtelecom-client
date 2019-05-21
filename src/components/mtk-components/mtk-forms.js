import {bindActionCreators} from 'redux'
import {fetchCreateEquipment, fetchUpdateEquipment} from '../../redux'
import DataForm from '../forms/data-form'
import withDataForm from '../../HOC/with-data-form'
import {equipmentFormMask} from '../../utils/form-mask'

const equipmentMapState = (state, {match}) => {
  const {equipment: {data, error, load}} = state;
  const id = match.params.id;
  let fields = null;

  if (id && data.length > 0) {
    fields = data.find(i => i.id === parseInt(id))
  }
  return {error, load, fields};
};

const equipmentActions = (dispatch, {mirtelecomService, match}) => {
  if (match.params.id) {
    return bindActionCreators({
      update: fetchUpdateEquipment(mirtelecomService)
    }, dispatch)
  } else {
    return bindActionCreators({
      create: fetchCreateEquipment(mirtelecomService)
    }, dispatch) 
  }
};

const EquipmentForm = withDataForm(equipmentMapState, equipmentActions, equipmentFormMask)(DataForm)

export {
  EquipmentForm
}