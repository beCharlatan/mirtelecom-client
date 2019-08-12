import React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './components/app/app'
import ErrorBoundry from './components/error/error-boundry'
import store from './store/index'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import './features/map/marker'
import './scss/index.scss'

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <Router basename="/">
        <App />
      </Router>
    </ErrorBoundry>
  </Provider>,
document.querySelector("#root"))
