import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {compose} from '../utils'
import Loader from '../components/common/loader'
import ErrorMessage from '../components/error/error-message'
import {fetchEquipment, fetchRemoveEquipment, getFilteredData, getState} from "../store/equipment"

class EquipmentsContainer extends React.PureComponent {

  componentDidMount() {
    this.props.get()
  }

  render() {
    const {data, error, load, remove, history} = this.props

    if (load) return <Loader />
    if (error) return <ErrorMessage />

    return this.props.render({
      history: history,
      scrollTo: this.scrollTo,
      data: data,
      remove: remove
    })
  }
}

const mapState = state => {
  const {load, error} = getState(state)
  return {load,
    error,
    data: getFilteredData(state)
  }
}

export default compose(
  withRouter,
  connect(mapState, {
    get: fetchEquipment,
    remove: fetchRemoveEquipment
  })
)(EquipmentsContainer)
