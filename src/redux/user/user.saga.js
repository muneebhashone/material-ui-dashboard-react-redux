import axios from 'axios';
import { UserActionTypes } from '../user/user.types';
import {
  signInSuccess,
  signInFailure,
  signInStart as signUpSuccess,
  signUpFailure
} from './user.action';
import { put, call, takeLatest, all } from 'redux-saga/effects';

// Requests
function loginRequest(email, password) {
  return axios.post(
    'https://dev.1stopwebsitesolution.com/demo/shake_server/public/api/login',
    {
      email: email,
      password: password
    }
  );
}

function signUpRequest(data) {
  return axios.post(
    'https://dev.1stopwebsitesolution.com/demo/shake_server/public/api/signup',
    {
      email: data.email,
      password: data.password,
      name: data.name
    }
  );
}

function userEditRequest(data) {
  return axios.post(
    'https://dev.1stopwebsitesolution.com/demo/shake_server/public/api/login',
    {
      image: data.image,
      user_id: data.userId,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      country: data.country
    }
  );
}

// Utils
function setUserLocal(userObj) {
  if (localStorage.getItem('currentUser')) {
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(userObj));
  } else {
    localStorage.setItem('currentUser', JSON.stringify(userObj));
  }
}

// Sagas
function* signInStart({ payload: { email, password } }) {
  try {
    const {
      data: { data }
    } = yield call(loginRequest, email, password);
    yield put(signInSuccess(data));
    yield call(setUserLocal, data);
  } catch (err) {
    yield put(signInFailure(String(err.message)));
  }
}

function* signUpStart({ payload }) {
  try {
    const { data } = yield call(signUpRequest, payload);
    console.log(data);
    if (data.success) {
      yield delete payload.name;
      yield put(signUpSuccess(payload));
    }

    if (!data.success) {
      yield put(signUpFailure(data.message));
    }
  } catch (err) {
    console.log(err.message);
    yield put(signUpFailure(err.message));
  }
}

function* clearUserLocal() {
  yield localStorage.removeItem('currentUser');
}

// Root Saga
export default function* userSaga() {
  yield all([
    takeLatest(UserActionTypes.SIGN_IN_START, signInStart),
    takeLatest(UserActionTypes.SIGN_UP_START, signUpStart),
    takeLatest(UserActionTypes.CLEAR_CURRENT_USER, clearUserLocal)
  ]);
}
