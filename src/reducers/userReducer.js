const {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_GOOGLE_REQUEST,
  USER_GOOGLE_SUCCESS,
  USER_GOOGLE_FAIL,
} = require("../constants/userConstants");

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading2: true };
    case USER_REGISTER_SUCCESS:
      return { loading2: false, userInfo2: action.payload };
    case USER_REGISTER_FAIL:
      return { loading2: false, error2: action.payload };
    default:
      return state;
  }
}

function userGoogleSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_GOOGLE_REQUEST:
      return { loading5: true };
    case USER_GOOGLE_SUCCESS:
      return { loading5: false, userInfo5: action.payload };
    case USER_GOOGLE_FAIL:
      return { loading5: false, error5: action.payload };
    default:
      return state;
  }
}

export {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
  userGoogleSigninReducer,
};
