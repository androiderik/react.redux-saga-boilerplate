import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
// import { routerMiddleware } from 'connected-react-router';


import createReducer from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();
/**
 * Create a configured redux store
 * @param {Object} initialState - Initial state to pass to createStore
 * @param {Object} history - History used by react-router
 * @return {Object} A Redux store
 */
export default function configureStore(initialState = {}, history) {
  const middleware = [
    sagaMiddleware,
    routerMiddleware(history),
    createLogger()

  ];

  // add web storage enhancer
  const enhancers = [
    applyMiddleware(...middleware),
  ];
  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers)
  );

  store.asyncSagas = {};
  store.asyncReducers = {};
  store.runSaga = sagaMiddleware.run;
  return store;
}
