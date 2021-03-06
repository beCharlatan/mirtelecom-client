import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './components/app/app'
import ErrorBoundry from './components/error/error-boundry'
import MirtelecomService from './services/mirtelecom-service'
import {MirtelecomServiceProvider} from './context/mirtelecom-service-context'
import store from './store'
import 'react-virtualized/styles.css'
import 'leaflet/dist/leaflet.css'
import './components/map/marker'
import './scss/index.scss'

const mirtelecomService = new MirtelecomService()

if (!('auth' in localStorage)) {
  localStorage['auth'] = false
}

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <MirtelecomServiceProvider value={mirtelecomService}>
        <Router>
          <App />
        </Router>
      </MirtelecomServiceProvider>
    </ErrorBoundry>
  </Provider>,
document.querySelector("#root"))
