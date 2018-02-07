import { createStore, combineReducers, applyMiddleware } from 'redux'

import createHistory from 'history/createBrowserHistory'

import { routerReducer, routerMiddleware } from 'react-router-redux'

import reducers from './reducers'

const history = createHistory()

const middleware = routerMiddleware( history )

const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    applyMiddleware( middleware ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export { store }
export { history }