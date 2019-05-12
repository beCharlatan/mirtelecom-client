import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import withMirtelecomService from '../../HOC/with-mirtelecom-service'
import {compose} from '../../utils'
import Loader from '../common/loader'
import ErrorMessage from '../error/error-message'
import {equipmentSelector} from "../../selectors/equipment-selector"
import {
  fetchEquipment,
  fetchOneEquipment,
  fetchRemoveEquipment
} from "../../redux"

class EquipmentData extends React.Component {

  componentDidMount() {
    const {id} = this.props.match.params
    if (id) {
      this.props.get(id)
    } else {
      this.props.get()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter && (this.props.filter.join('') !== prevProps.filter.join(''))) {
      this.props.get()
    }
  }

  render() {

    const {data, error, load, remove} = this.props

    if (load) return <Loader />
    if (error) return <ErrorMessage />

    return this.props.render({
      data: data,
      remove: remove
    })
  }
}

const mapState = (state, {match}) => {
  const {id} = match.params
  const {equipment: {load, error, filter, detailed}} = state
  const data = id ? detailed : equipmentSelector(state)
  return {load,
    error,
    filter,
    data: data
  }
}

const actions = (disptach, {mirtelecomService, match}) => {
  const {id} = match.params
  const fetch = id ? fetchOneEquipment(mirtelecomService) : fetchEquipment(mirtelecomService)
  return bindActionCreators({
    get: fetch,
    remove: fetchRemoveEquipment(mirtelecomService)
  }, disptach)
}

export default compose(
  withRouter,
  withMirtelecomService(),
  connect(mapState, actions)
)(EquipmentData)