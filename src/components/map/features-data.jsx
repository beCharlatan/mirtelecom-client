import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import withMirtelecomService from '../../HOC/with-mirtelecom-service'
import {compose} from '../../utils'
import Loader from '../common/loader'
import ErrorMessage from '../error/error-message'
import {
  fetchEquipmentFeature,
  fetchSubstationFeature,
  fetchMuftsFeature,
  fetchVokFeature
} from "../../redux"

class FeaturesData extends React.Component {

  componentDidMount() {
    this.props.getEquipment()
    this.props.getSubstation()
    this.props.getMufts()
    this.props.getVok()
  }

  componentDidUpdate() {}

  render() {

    const {error, load, features} = this.props

    if (load) return <Loader />
    if (error) return <ErrorMessage />

    return this.props.render({
      features: features
    })
  }
}

const mapState = (state) => {
  const {map: {load, error, features}} = state
  return {load,
    error,
    features
  }
}

const actions = (disptach, {mirtelecomService}) => {
  return bindActionCreators({
    getEquipment: fetchEquipmentFeature(mirtelecomService),
    getSubstation: fetchSubstationFeature(mirtelecomService),
    getMufts: fetchMuftsFeature(mirtelecomService),
    getVok: fetchVokFeature(mirtelecomService)
  }, disptach)
}

export default compose(
  withRouter,
  withMirtelecomService(),
  connect(mapState, actions)
)(FeaturesData)