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
  fetchRemoveEquipment
} from "../../redux"

class FeatureData extends React.Component {

  componentDidMount() {
    this.props.get()
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter && (this.props.filter.join('') !== prevProps.filter.join(''))) {
      this.props.get()
    }
  }

  render() {

    const {data, error, load} = this.props

    if (load) return <Loader />
    if (error) return <ErrorMessage />

    return this.props.render({
      data: data
    })
  }
}

const mapState = (state) => {
  const {equipment: {load, error}} = state
  return {load,
    error,
    data: equipmentSelector(state)
  }
}

const actions = (disptach, {mirtelecomService}) => {
  return bindActionCreators({
    get: fetchEquipment(mirtelecomService),
    remove: fetchRemoveEquipment(mirtelecomService)
  }, disptach)
}

export default compose(
  withRouter,
  withMirtelecomService(),
  connect(mapState, actions)
)(FeatureData)