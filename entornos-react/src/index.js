import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './config/store'
import './index.css'
import AppRouter from './AppRouter'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <BrowserRouter>
    <Provider store= {store}>
      <AppRouter />
    </Provider>         
  </BrowserRouter>, document.getElementById('root'))


registerServiceWorker()
