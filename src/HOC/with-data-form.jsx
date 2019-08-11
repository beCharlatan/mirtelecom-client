import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {compose} from '../utils'

const withDataForm = (mapState, actions, mask) => (Wrapped) => {

  class Wrapper extends React.Component {

    handleSubmit = values => {
      const redirect = () => this.props.history.push('/')
      if (!values.id) {
        this.props.create(values, redirect)
      } else {
        this.props.update(values, redirect)
      }
    };

    render() {
      return <Wrapped
        mask={mask}
        handleSubmit={this.handleSubmit}
        {...this.props} />
    }
  }
  
  return compose(
    withRouter,
    connect(mapState, actions)
  )(Wrapper)
}

export default withDataForm