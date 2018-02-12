import request from './request';
import { AUTH_USER } from '../actions';
const TRY_CONNECT_SERVER = 'TRY_CONNECT_SERVER';

export function serverConnect(){
  return function (dispatch) {
    request
        .get(`/api`)
        .then(res => {
            dispatch({ type: AUTH_USER, payload: localStorage.getItem('auth_jwt_token') })
            dispatch({ type: TRY_CONNECT_SERVER, payload: 'connected' })
        })
        .catch(error => {
            console.log(error);
        });
  }
}

let INITIAL_STATE = {
    connection: false
}

export function serverReducer(state=INITIAL_STATE, action) {
  switch (action.type) {
      case TRY_CONNECT_SERVER:
          return { ...state, connection: action.payload }
      default:
          return state
  }
}