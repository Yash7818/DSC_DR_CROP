import {
  EXPERT_SIGNIN_REQUEST,
  EXPERT_SIGNIN_SUCCESS,
  EXPERT_SIGNIN_FAIL,
  EXPERT_REGISTER_REQUEST,
  EXPERT_REGISTER_SUCCESS,
  EXPERT_REGISTER_FAIL,
  EXPERT_GOOGLE_REQUEST,
  EXPERT_GOOGLE_SUCCESS,
  EXPERT_GOOGLE_FAIL,
} from "../constants/expertConstant";

function expertSigninReducer(state = {}, action) {
  switch (action.type) {
    case EXPERT_SIGNIN_REQUEST:
      return { loading3: true };
    case EXPERT_SIGNIN_SUCCESS:
      return { loading3: false, expertInfo: action.payload };
    case EXPERT_SIGNIN_FAIL:
      return { loading3: false, error3: action.payload };
    default:
      return state;
  }
}

function expertRegisterReducer(state = {}, action) {
  switch (action.type) {
    case EXPERT_REGISTER_REQUEST:
      return { loading4: true };
    case EXPERT_REGISTER_SUCCESS:
      return { loading4: false, expertInfo4: action.payload };
    case EXPERT_REGISTER_FAIL:
      return { loading4: false, error4: action.payload };
    default:
      return state;
  }
}

function expertGoogleSigninReducer(state = {}, action) {
  switch (action.type) {
    case EXPERT_GOOGLE_REQUEST:
      return { loading: true };
    case EXPERT_GOOGLE_SUCCESS:
      return { loading: false, expertInfo: action.payload };
    case EXPERT_GOOGLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  expertSigninReducer,
  expertRegisterReducer,
  expertGoogleSigninReducer,
};
