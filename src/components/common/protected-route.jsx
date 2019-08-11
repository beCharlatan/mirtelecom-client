import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {showNotification} from "../../store/notification"

const ProtectedRoute = ({auth, component, showNotification, ...rest}) => {

  React.useEffect(() => {
    if (!auth) showNotification({
      message: `Вым отказано в доступе, вы не авторизованы.`,
      intent: 'DANGER'
    })
  })

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

export default connect(mapStateToProps, {
  showNotification
})(ProtectedRoute);