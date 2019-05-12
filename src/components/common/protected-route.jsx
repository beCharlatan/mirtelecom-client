import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const ProtectedRoute = ({auth, component, ...rest}) => {

  const renderProtected = (routeProps) => {
    const ProtectedComponent = component;
    return (auth ? 
      <ProtectedComponent {...routeProps} /> : 
      <Redirect to="/" />)
  }

  return (
    <Route {...rest} render={renderProtected} />
  );
}

const mapStateToProps = ({auth}) => {
  return {auth}
}

export default connect(mapStateToProps)(ProtectedRoute);