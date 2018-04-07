import * as React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createEpicMiddleware } from 'redux-observable'
import CssBaseline from 'material-ui/CssBaseline'

import { App } from './App'
import { reducers, epics } from '@state/index'
// import { register as registerSW } from './registerServiceWorker'

const composeMiddleware =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const epicMiddleware = createEpicMiddleware(epics)

const store = createStore(
  reducers,
  composeMiddleware(applyMiddleware(epicMiddleware))
)

render(
  <Provider store={store}>
    <React.Fragment>
      <CssBaseline />
      <App />
    </React.Fragment>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

if ((module as any).hot) {
  ;(module as any).hot.accept('./App', () => {
    const { App: NextApp } = require('./App')

    render(
      <Provider store={store}>
        <React.Fragment>
          <CssBaseline />
          <NextApp />
        </React.Fragment>
      </Provider>,
      document.getElementById('root')
    )
  })
  ;(module as any).hot.accept('@state/index', () => {
    const { reducers: nextReducers, epics: nextEpics } = require('@state/index')

    store.replaceReducer(nextReducers)
    epicMiddleware.replaceEpic(nextEpics)
  })
}

// registerSW()
