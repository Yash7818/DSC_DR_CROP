import Cookie from "js-cookie";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_LOGOUT,
  USER_GOOGLE_REQUEST,
  USER_GOOGLE_SUCCESS,
  USER_GOOGLE_FAIL,
} from "../constants/userConstants";
const { default: Axios } = require("axios");

const update = ({ userId, name, email, password, fd }) => async (
  dispatch,
  getState
) => {
  const {
    userSignin: { userInfo },
  } = getState();
  dispatch({
    type: USER_UPDATE_REQUEST,
    payload: { userId, name, email, password, fd },
  });
  try {
    const { data } = await Axios.put(
      "/api/users/" + userId,
      { name, email, password, fd },
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data));
  } catch (e) {
    dispatch({ type: USER_UPDATE_FAIL, payload: e.message });
  }
};

const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await Axios.post("/api/users/login", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.parse(JSON.stringify(data)));
  } catch (e) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: e.message });
  }
};
const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.parse(JSON.stringify(data)));
  } catch (e) {
    dispatch({ type: USER_REGISTER_FAIL, payload: e.message });
  }
};

const googleauth = (tokenId) => async (dispatch) => {
  dispatch({
    type: USER_GOOGLE_REQUEST,
    payload: { tokenId },
  });
  try {
    const { data } = await Axios.post("/api/users/googlelogin", {
      tokenId,
    });
    console.log(data);
    dispatch({ type: USER_GOOGLE_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.parse(JSON.stringify(data)));
  } catch (e) {
    dispatch({ type: USER_GOOGLE_FAIL, payload: e.message });
  }
};
const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export { signin, register, logout, update, googleauth };
