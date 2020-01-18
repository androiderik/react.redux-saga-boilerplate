
/* eslint-disable no-param-reassign */
import { combineReducers } from "redux";
import Keys from "./Keys";

/**
 * A reducer that returns it's state untouched
 * @param {Object} state - Redux state
 * @return {Object} The same redux state
 */
function noop(state = {}) {
  return state;
}

/**
 * Higher order reducer to create reducer that persist
 * @param {Object} reducers - Reducers to combine
 */
export default function(reducers) {
  Keys.rehydrate();
  Keys.getAll().forEach(key => {
    if (!Reflect.has(reducers, key)) {
      reducers[key] = noop;
    }
  });

  return combineReducers(reducers);
}
