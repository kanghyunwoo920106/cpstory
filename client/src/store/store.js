import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// 초기 상태 정의
const initialState = {
  datas: [],
  input: { title: "", description: "" },
  image: [],
  showImages: [],
  isOpen: false,
  postCheck: 0,
  show: false,
  inputSearch: "",
  date: {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
  searchMap: "분당맛집",
  markers: [],
  info: "",
  loading: false,
  address: [],
  popShow: false,
};

// 액션 타입 정의
const SET_DATAS = "SET_DATAS";
const SET_INPUT = "SET_INPUT";
const SET_IMAGE = "SET_IMAGE";
const SET_SHOW_IMAGES = "SET_SHOW_IMAGES";
const SET_OPEN = "SET_OPEN";
const SET_POST_CHECK = "SET_POST_CHECK";
const SET_SHOW = "SET_SHOW";
const SET_INPUT_SEARCH = "SET_INPUT_SEARCH";
const SET_DATE = "SET_DATE";
const SET_SEARCH_MAP = "SET_SEARCH_MAP";
const SET_MARKERS = "SET_MARKERS";
const SET_INFO = "SET_INFO";
const SET_LOADING = "SET_LOADING";
const SET_ADDRESS = "SET_ADDRESS";
const SET_POPSHOW = "SET_POPSHOW";

// 액션 생성 함수 정의
export const setDatas = (datas) => ({
  type: SET_DATAS,
  datas,
});

export const setInput = (input) => ({
  type: SET_INPUT,
  input,
});

export const setImage = (image) => ({
  type: SET_IMAGE,
  image,
});

export const setShowImages = (showImages) => ({
  type: SET_SHOW_IMAGES,
  showImages,
});

export const setOpen = (isOpen) => ({
  type: SET_OPEN,
  isOpen,
});

export const setPostCheck = (postCheck) => ({
  type: SET_POST_CHECK,
  postCheck,
});

export const setShow = (show) => ({
  type: SET_SHOW,
  show,
});

export const setInputSearch = (inputSearch) => ({
  type: SET_INPUT_SEARCH,
  inputSearch,
});

export const setDate = (date) => ({
  type: SET_DATE,
  date,
});

export const setSearchMap = (searchMap) => ({
  type: SET_SEARCH_MAP,
  searchMap,
});

export const setMarkers = (markers) => ({
  type: SET_MARKERS,
  markers,
});

export const setInfo = (info) => ({
  type: SET_INFO,
  info,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  address,
});

export const setPopShow = (popShow) => ({
  type: SET_POPSHOW,
  popShow,
});

// 리듀서 함수 정의
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATAS:
      return {
        ...state,
        datas: action.datas,
      };
    case SET_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case SET_IMAGE:
      return {
        ...state,
        image: action.image,
      };
    case SET_SHOW_IMAGES:
      return {
        ...state,
        showImages: action.showImages,
      };
    case SET_OPEN:
      return {
        ...state,
        isOpen: action.isOpen,
      };
    case SET_POST_CHECK:
      return {
        ...state,
        postCheck: action.postCheck,
      };
    case SET_SHOW:
      return {
        ...state,
        show: action.show,
      };
    case SET_INPUT_SEARCH:
      return {
        ...state,
        inputSearch: action.inputSearch,
      };
    case SET_DATE:
      return {
        ...state,
        date: action.date,
      };
    case SET_SEARCH_MAP:
      return {
        ...state,
        searchMap: action.searchMap,
      };
    case SET_MARKERS:
      return {
        ...state,
        markers: action.markers,
      };
    case SET_INFO:
      return {
        ...state,
        info: action.info,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.address,
      };
    case SET_POPSHOW:
      return {
        ...state,
        popShow: action.popShow,
      };

    default:
      return state;
  }
};

// 스토어 생성
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
