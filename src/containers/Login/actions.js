import {FETCH_LOGIN_MESSAGE, GET_LOGIN_MESSAGE  } from './constants';

/**
 * This is an intent   that proves the interaction with redux sagas
 * remove if it's not necessary any more
 */
export function loadMessage() {
  return {
    type: FETCH_LOGIN_MESSAGE
  };
};


/**
 * This is an intent that proves the interaction with redux sagas in order to update the state
 * remove if it's not necessary any more
 * @param message this variable will be set in the reducer and then to the state
 */
export function getMessage(message) {
  return {
    message: message,
    type: GET_LOGIN_MESSAGE
  };
};