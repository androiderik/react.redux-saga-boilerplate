import { takeEvery, call, put } from "redux-saga/effects";
import {
  getMessage
} from "./actions";
import {
  FETCH_LOGIN_MESSAGE,
} from "./constants";

/**
 * These sagas are used to perform side effects 
 * looks like synchronous code but they aren't.
 * @param {action} action 
 */

export function* fetchLoginMessage(action) {
  yield put(getMessage('A message coming from a saga'));
}

export default function* loginSaga() {
  yield takeEvery(FETCH_LOGIN_MESSAGE, fetchLoginMessage);
}
