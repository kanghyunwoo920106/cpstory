import { setDiaryData, setLoading } from "../store/store.js";
import axios from "axios";

export const GetDiaryData = async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const result = await axios.get("/api/get/diary");
    dispatch(setDiaryData(result.data.diarydata));
    dispatch(setLoading(false));
  } catch (error) {
    console.error(error);
  }
};
