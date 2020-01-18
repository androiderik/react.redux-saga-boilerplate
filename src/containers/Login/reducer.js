import { GET_LOGIN_MESSAGE } from './constants';

const initialState = {
  message: "Ops platform"
};

/**
 * Reducer is a pure function that is being listened by the CreateReducer implementation, this set the data to the state.
 * @param {state} state 
 * @param {action} action 
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOGIN_MESSAGE:
      return {
        ...state,
        message: action.message
      };

    default: 
      return state;

  }
};