import * as React from 'react'
import ErrorMessage from './error-message'

export default class ErrorBoundry extends React.Component {
  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({hasError: true})
  }

  render() {
    if (this.state.hasError) return <ErrorMessage
      icon="issue"
      title="Неизвестная ошибка"
    />

    return this.props.children
  }
}