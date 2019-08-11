import React from 'react'
import {connect} from 'react-redux'
import {changeOptions} from '../store/option'

const withOptions = (optionType, dataType = null) => (Wrapped) => {

  const mapState = state => {
    return {
      columns: dataType && state[dataType].data[0] && Object.keys(state[dataType].data[0]),
      options: state.options[optionType]
    }
  }

  const actions = {
    changeOptions: changeOptions
  }

  class Wrapper extends React.Component {

    saveOptions = (obj, optionType) => {
      return localStorage[optionType] = JSON.stringify(obj)
    }

    render() {
      return <Wrapped
        {...this.props}
        saveOptions={this.saveOptions}
        changeOptions={this.props.changeOptions}
        options={this.props.options}
      />
    }
  }

  return connect(mapState, actions)(Wrapper);
}

export default withOptions