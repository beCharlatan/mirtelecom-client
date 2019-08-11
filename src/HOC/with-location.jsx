import React from 'react'
import {connect} from 'react-redux'
import {fetchLocateEquipment} from '../store/equipment'

const withLocation = () => (Wrapped) => {

  class Wrapper extends React.Component {

    render() {
      return <Wrapped
        {...this.props}
        setLatLng={this.props.setLatLng}
      />
    }
  }

  return connect(null, {setLatLng: fetchLocateEquipment})(Wrapper)
}

export default withLocation