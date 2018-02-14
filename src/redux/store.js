import { createStore, combineReducers, applyMiddleware } from 'redux'

import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducers from './reducers'

const history = createHistory()

const initialState = {};
const reducer = combineReducers({
  ...reducers,
  router: routerReducer
});
const finalCreateStore = applyMiddleware(
  routerMiddleware( history ), 
  thunk,
  promise() 
)( createStore );


const store = finalCreateStore( 
  reducer, 
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store }
export { history }