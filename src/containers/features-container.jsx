import * as React from 'react'
import {connect} from 'react-redux'
import Loader from '../components/common/loader'
import ErrorMessage from '../components/error/error-message'
import {fetchEquipmentFeature, fetchMuftsFeature, fetchSubstationFeature, fetchVokFeature} from '../store/map'

class FeaturesContainer extends React.Component {

  componentDidMount() {
    this.props.getEquipment()
    this.props.getSubstation()
    this.props.getMufts()
    this.props.getVok()
  }

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

export default connect(mapState, {
  getEquipment: fetchEquipmentFeature,
  getSubstation: fetchSubstationFeature,
  getMufts: fetchMuftsFeature,
  getVok: fetchVokFeature
})(FeaturesContainer)