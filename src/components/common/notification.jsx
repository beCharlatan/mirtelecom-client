import React from 'react'
import {connect} from 'react-redux'
import {clearNotification} from '../../store/notification'
import {Toaster, Position, Intent} from '@blueprintjs/core'

export const AppToaster = Toaster.create({
  className: "recipe-toaster",
  position: Position.TOP,
});

class Notification extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.notification && this.props.notification !== prevProps.notification) {
      this.showToast()
      setTimeout(() => {
        this.props.clearNotification()
      }, 2999)
    } else {
      this.closeToast()
    }
  }

  showToast = () => {
    AppToaster.show({
      message: this.props.notification.message,
      intent: Intent[this.props.notification.intent],
      timeout: 3000
    })
  }

  closeToast = () => AppToaster.clear()

  render() {
    return false
  }
}

const mapState = state => {
  const {notification} = state
  return {notification}
}

export default connect(mapState, {clearNotification})(Notification)