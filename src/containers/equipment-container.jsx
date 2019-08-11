import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {compose} from '../utils'
import Loader from '../components/common/loader'
import ErrorMessage from '../components/error/error-message'
import {getState, fetchRemoveEquipment, getEquipmentItem, fetchGeocodeEquipment} from '../store/equipment'

class EquipmentContainer extends React.PureComponent {

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      console.log('updated!')
    }
  }

  render() {
    const {data, error, load, remove, geocode} = this.props

    if (load) return <Loader />
    if (error) return <ErrorMessage />
    if (!data) return <div>No data</div>

    return this.props.render({
      geocode: geocode,
      data: data,
      remove: remove
    })
  }
}

const mapState = (state, {match}) => {
  const id = match.params.id
  const {load, error} = getState(state)
  return {load,
    error,
    data: getEquipmentItem(state, id)
  }
}

export default compose(
  withRouter,
  connect(mapState, {
    geocode: fetchGeocodeEquipment,
    remove: fetchRemoveEquipment
  })
)(EquipmentContainer)