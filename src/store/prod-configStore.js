import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import thunkActions from '../thunks'

/* In prod store there shouldn't be redux-logger */
const prodStore = (initalState = {}) => {
  const store = createStore(
    reducers,
    initalState,
    applyMiddleware(thunk, thunkActions)
  )

  return store
}

export default prodStore
