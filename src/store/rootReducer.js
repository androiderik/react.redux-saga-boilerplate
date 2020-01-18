/**
 * This is the root reducer of the application, i.e. the one passed to the redux
 * createStore function import all of your reducers here for synchronous routes or
 * add them to the store.asyncReducers object for asynchronous routes (i.e. code splitting)
 * @param reducers - An object that contains the passed reducers to be combined
 */
import { routerReducer } from "react-router-redux";
// import { connectRouter } from 'connected-react-router'
import { combineReducers } from "../enhancers/persistState";

export default function createReducer(reducers = {}) {
  return combineReducers({
    ...reducers,
    router: routerReducer,
  });
}
