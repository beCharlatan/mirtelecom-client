import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {compose} from '../utils';
import withMirtelecomService from './with-mirtelecom-service';

const withTableOptions = (optionType) => (Wrapped) => {

  const mapState = state => {
    return {
      options: state.options[optionType]
    }
  }

  class Wrapper extends React.Component {

    render() {
      return <Wrapped
        {...this.props}
        options={this.props.options}
      />
    }
  }

  return compose(
    withRouter,
    withMirtelecomService(),
    connect(mapState)
  )(Wrapper);
}

export default withTableOptions