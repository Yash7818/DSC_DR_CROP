import {
  EXPERT_SIGNIN_REQUEST,
  EXPERT_SIGNIN_SUCCESS,
  EXPERT_SIGNIN_FAIL,
  EXPERT_REGISTER_REQUEST,
  EXPERT_REGISTER_SUCCESS,
  EXPERT_REGISTER_FAIL,
} from "../constants/expertConstant";

function expertSigninReducer(state = {}, action) {
  switch (action.type) {
    case EXPERT_SIGNIN_REQUEST:
      return { loading: true };
    case EXPERT_SIGNIN_SUCCESS:
      return { loading: false, expertInfo: action.payload };
    case EXPERT_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function expertRegisterReducer(state = {}, action) {
  switch (action.type) {
    case EXPERT_REGISTER_REQUEST:
      return { loading: true };
    case EXPERT_REGISTER_SUCCESS:
      return { loading: false, expertInfo: action.payload };
    case EXPERT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { expertSigninReducer, expertRegisterReducer };
