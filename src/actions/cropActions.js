import {
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
} from "../constants/cropConstants";
import axios from "axios";

const saveCrop = (crop) => async (dispatch, getstate) => {
  try {

    dispatch({ type: CROP_SAVE_REQUEST, payload: crop });
    console.log(crop);
    const {
      userSignin: { userInfo },
    } = getstate();
      const { data } = await axios.post("/api/crop/cropdetail", crop, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: CROP_SAVE_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: CROP_SAVE_FAIL, payload: e });
  }
};

const listCrop = () => async (dispatch, getstate) => {
  try {
    dispatch({ type: CROP_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getstate();
    const { data } = await axios.get("/api/crop/cropdetail", {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: CROP_LIST_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: CROP_LIST_FAIL, payload: e });
  }
};

const listOneCrop = (cropId) => async (dispatch, getstate) => {
  try {
    dispatch({ type: CROP_LIST_ONE_REQUEST, payload: cropId });
    const {
      userSignin: { userInfo },
    } = getstate();
    if (cropId) {
      const { data } = await axios.get("/api/crop/cropdetail/" + cropId, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: CROP_LIST_ONE_SUCCESS, payload: data });
    }
  } catch (e) {
    dispatch({ type: CROP_LIST_ONE_FAIL, payload: e });
  }
};

const deleteOneCrop = (cropId) => async (dispatch, getstate) => {
  try {
    dispatch({ type: CROP_DELETE_ONE_REQUEST, payload: cropId });
    const {
      userSignin: { userInfo },
    } = getstate();
    if (cropId) {
      const { data } = await axios.delete("/api/crop/cropdetail/" + cropId, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: CROP_DELETE_ONE_SUCCESS, payload: data });
    }
  } catch (e) {
    dispatch({ type: CROP_DELETE_ONE_FAIL, payload: e });
  }
};

export { saveCrop, listCrop, listOneCrop, deleteOneCrop };
