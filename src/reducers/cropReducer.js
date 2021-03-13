const {
  CROP_SAVE_REQUEST,
  CROP_SAVE_SUCCESS,
  CROP_SAVE_FAIL,
  CROP_LIST_REQUEST,
  CROP_LIST_SUCCESS,
  CROP_LIST_FAIL,
  CROP_LIST_ONE_REQUEST,
  CROP_LIST_ONE_SUCCESS,
  CROP_LIST_ONE_FAIL,
  CROP_DELETE_ONE_REQUEST,
  CROP_DELETE_ONE_SUCCESS,
  CROP_DELETE_ONE_FAIL,
} = require("../constants/cropConstants");

function cropSaveReducer(state = { crop: {} }, action) {
  switch (action.type) {
    case CROP_SAVE_REQUEST:
      return { loading: true };
    case CROP_SAVE_SUCCESS:
      return { loading: false, crop: action.payload, success: true };
    case CROP_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function cropListReducer(state = { crop: {} }, action) {
  switch (action.type) {
    case CROP_LIST_REQUEST:
      return { loading: true };
    case CROP_LIST_SUCCESS:
      return { loading: false, crop: action.payload };
    case CROP_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function cropListOneReducer(state = { crop: {} }, action) {
  switch (action.type) {
    case CROP_LIST_ONE_REQUEST:
      return { loading: true };
    case CROP_LIST_ONE_SUCCESS:
      return { loading: false, crop: action.payload };
    case CROP_LIST_ONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function cropDeleteReducer(state = { crop: {} }, action) {
  switch (action.type) {
    case CROP_DELETE_ONE_REQUEST:
      return { loading: true };
    case CROP_DELETE_ONE_SUCCESS:
      return { loading: false, crop: action.payload };
    case CROP_DELETE_ONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
export {
  cropSaveReducer,
  cropListReducer,
  cropListOneReducer,
  cropDeleteReducer,
};
