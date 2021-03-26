import Cookie from "js-cookie";
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
import axios from "axios";

const saveRequest = (query) => async (dispatch, getstate) => {
  try {
    dispatch({ type: REQ_SAVE_REQUEST, payload: query });
    const {
      userSignin: { userInfo },
    } = getstate();
    const { data } = await axios.post(
      "https://dr-crop-backend.azurewebsites.net/api/request/sendrequest",
      query,
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    console.log(data);
    dispatch({ type: REQ_SAVE_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: REQ_SAVE_FAIL, payload: e });
  }
};

const listRequest = () => async(dispatch, getstate) => {
  try {
    dispatch({ type: REQ_LIST_REQUEST });
    const {
      expertSignin: { expertInfo },
    } = getstate();
<<<<<<< HEAD
    const {data}  = await axios.get("/api/request/getrequest", {
      headers: {
        Authorization: "Bearer " + expertInfo.token,
      },
    }).then((res)=>{
      console.log(res.data)
      dispatch({ type: REQ_LIST_SUCCESS, payload:res.data });
      return res.data;
    });
=======
    const { data } = await axios.get(
      "https://dr-crop-backend.azurewebsites.net/api/request/getrequest",
      {
        headers: {
          Authorization: "Bearer " + expertInfo.token,
        },
      }
    );
    dispatch({ type: REQ_LIST_SUCCESS, payload: data });
>>>>>>> 814e5885c13880a9344a4029d14082909d973a85
  } catch (e) {
    dispatch({ type: REQ_LIST_FAIL, payload: e });
  }
};

const listOneRequest = (requestId) => async (dispatch, getstate) => {
  try {
    dispatch({ type: REQ_LIST_ONE_REQUEST });
    const {
      expertSignin: { expertInfo },
    } = getstate();
    const { data } = await axios.get(
      "https://dr-crop-backend.azurewebsites.net/api/request/getrequest/" +
        requestId,
      {
        headers: {
          Authorization: "Bearer " + expertInfo.token,
        },
      }
    );
    dispatch({ type: REQ_LIST_ONE_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: REQ_LIST_ONE_FAIL, payload: e });
  }
};

const updateOneRequest = (requestId) => async (dispatch, getstate) => {
  try {
    dispatch({ type: REQ_UPDATE_ONE_REQUEST });
    const {
      expertSignin: { expertInfo },
    } = getstate();
    const { data } = await axios.patch(
      "https://dr-crop-backend.azurewebsites.net/api/request/getrequest/" +
        requestId,
      {
        headers: {
          Authorization: "Bearer " + expertInfo.token,
        },
      }
    );
    dispatch({ type: REQ_UPDATE_ONE_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: REQ_UPDATE_ONE_FAIL, payload: e });
  }
};
export { saveRequest, listRequest, listOneRequest, updateOneRequest };
