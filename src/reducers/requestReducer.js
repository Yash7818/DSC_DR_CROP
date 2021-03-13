import {
  REQ_SAVE_REQUEST,
  REQ_SAVE_SUCCESS,
  REQ_SAVE_FAIL,
  REQ_LIST_REQUEST,
  REQ_LIST_SUCCESS,
  REQ_LIST_FAIL,
  REQ_LIST_ONE_REQUEST,
  REQ_LIST_ONE_SUCCESS,
  REQ_LIST_ONE_FAIL,
  REQ_UPDATE_ONE_REQUEST,
  REQ_UPDATE_ONE_SUCCESS,
  REQ_UPDATE_ONE_FAIL,
} from "../constants/requestConstants";

function requestSaveReducer(state = { query: {} }, action) {
  switch (action.type) {
    case REQ_SAVE_REQUEST:
      return { loading: true };
    case REQ_SAVE_SUCCESS:
      return { loading: false, query: action.payload };
    case REQ_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function requestListReducer(state = { query: {} }, action) {
  switch (action.type) {
    case REQ_LIST_REQUEST:
      return { loading: true };
    case REQ_LIST_SUCCESS:
      return { loading: false, query: action.payload };
    case REQ_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function requestListOneReducer(state = { query: {} }, action) {
  switch (action.type) {
    case REQ_LIST_ONE_REQUEST:
      return { loading: true };
    case REQ_LIST_ONE_SUCCESS:
      return { loading: false, query: action.payload };
    case REQ_LIST_ONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function requestUpdateOneReducer(state = { query: {} }, action) {
  switch (action.type) {
    case REQ_UPDATE_ONE_REQUEST:
      return { loading: true };
    case REQ_UPDATE_ONE_SUCCESS:
      return { loading: false, query: action.payload };
    case REQ_UPDATE_ONE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  requestSaveReducer,
  requestListReducer,
  requestListOneReducer,
  requestUpdateOneReducer,
};
