import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
  userGoogleSigninReducer,
} from "./reducers/userReducer";
import {
  expertSigninReducer,
  expertRegisterReducer,
  expertGoogleSigninReducer,
} from "./reducers/expertReducer";
import {
  requestSaveReducer,
  requestListOneReducer,
  requestListReducer,
  requestUpdateOneReducer,
} from "./reducers/requestReducer";

const userInfo = Cookie.getJSON("userInfo") || null;
const expertInfo = Cookie.getJSON("expertInfo") || null;

const initialState = { userSignin: { userInfo }, expertSignin: { expertInfo } };
const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userGoogleSignin: userGoogleSigninReducer,
  userUpdate: userUpdateReducer,
  expertSignin: expertSigninReducer,
  expertRegister: expertRegisterReducer,
  expertGoogleSignin: expertGoogleSigninReducer,
  requestSave: requestSaveReducer,
  requestListOne: requestListOneReducer,
  requestList: requestListReducer,
  requestUpdate: requestUpdateOneReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
