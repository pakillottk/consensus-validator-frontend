import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducers from './reducers'

const initialState = {};
const reducer = combineReducers({
  ...reducers
});
const enhancer = compose(
  applyMiddleware(
  thunk,
  promise
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (next) => next
);

const store = createStore(reducer, initialState, enhancer);

export { store }