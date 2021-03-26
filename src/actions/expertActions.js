import Cookie from "js-cookie";
import {
  EXPERT_REGISTER_REQUEST,
  EXPERT_REGISTER_SUCCESS,
  EXPERT_REGISTER_FAIL,
  EXPERT_SIGNIN_REQUEST,
  EXPERT_SIGNIN_SUCCESS,
  EXPERT_SIGNIN_FAIL,
  EXPERT_GOOGLE_REQUEST,
  EXPERT_GOOGLE_SUCCESS,
  EXPERT_GOOGLE_FAIL,
  EXPERT_LOGOUT,
} from "../constants/expertConstant";
const { default: Axios } = require("axios");

const registerExpert = (name, email, password) => async (dispatch) => {
  dispatch({
    type: EXPERT_REGISTER_REQUEST,
    payload: { name, email, password },
  });
  try {
    const { data } = await Axios.post(
      "/api/expert/registerexpert",
      {
        name,
        email,
        password,
      }
    );
    dispatch({ type: EXPERT_REGISTER_SUCCESS, payload: data });
    Cookie.set("expertInfo", JSON.parse(JSON.stringify(data)));
  } catch (e) {
    dispatch({ type: EXPERT_REGISTER_FAIL, payload: e });
  }
};

const loginExpert = (email, password) => async (dispatch) => {
  dispatch({
    type: EXPERT_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await Axios.post(
      "/api/expert/loginexpert",
      {
        email,
        password,
      }
    );
    dispatch({ type: EXPERT_SIGNIN_SUCCESS, payload: data });
    Cookie.set("expertInfo", JSON.parse(JSON.stringify(data)));
  } catch (e) {
    dispatch({ type: EXPERT_SIGNIN_FAIL, payload: e });
  }
};

const googleauth = (tokenId) => async (dispatch) => {
  dispatch({
    type: EXPERT_GOOGLE_REQUEST,
    payload: { tokenId },
  });
  try {
    const { data } = await Axios.post(
      "/api/expert/googlelogin",
      {
        tokenId,
      }
    );
    console.log(data);
    dispatch({ type: EXPERT_GOOGLE_SUCCESS, payload: data });
    Cookie.set("expertInfo", JSON.parse(JSON.stringify(data)));
  } catch (e) {
    dispatch({ type: EXPERT_GOOGLE_FAIL, payload: e.message });
  }
};

const expertLogout = () => (dispatch) => {
  Cookie.remove("expertInfo");
  dispatch({ type: EXPERT_LOGOUT });
};

export { registerExpert, loginExpert, expertLogout, googleauth };
