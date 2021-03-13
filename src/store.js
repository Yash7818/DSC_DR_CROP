import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import Cookie from "js-cookie";
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
  userGoogleSigninReducer,
} from "./reducers/userReducer";

import {
  expertRegisterReducer,
  expertSigninReducer
} from "./reducers/expertReducer";

const userInfo = Cookie.getJSON("userInfo") || null;
const expertInfo = Cookie.getJSON("expertInfo") || null;

const initialState = { userSignin: { userInfo },userGoogleSignin:{userInfo},expertSignin: {expertInfo} };
const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userGoogleSignin:userGoogleSigninReducer,
  expertSignin: expertSigninReducer,
  expertRegister : expertRegisterReducer

  
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
