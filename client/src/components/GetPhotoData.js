import { setDatas, setLoading } from "../store/store.js";
import axios from "axios";

export const GetPhotoData = async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const result = await axios.get("/api/get/photodata");
    dispatch(setDatas(result.data.photodata));
    dispatch(setLoading(false));
  } catch (error) {
    console.error(error);
  }
};
