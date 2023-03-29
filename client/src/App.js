import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./page/Header";
import List from "./page/List";
import Add from "./page/Add";
import Main from "./page/Main";
import Profile from "./page/Profile";
import Footer from "./page/Footer";
import axios from "axios";
import MyModal from "./components/MyModal";
import NotFound from "./components/NotFound";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import {
  setDatas,
  setInput,
  setImage,
  setShowImages,
  setOpen,
  setPostCheck,
  setShow,
  setInputSearch,
  setDate,
  setSearchMap,
  setLoading,
  setDiaryData,
  setAuthenticated,
} from "./store/store.js";
import Loading from "./components/Loading";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";

function App() {
  const fileInput = useRef();
  const search = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const accessToken = localStorage.getItem("access_token");

  const {
    datas,
    input,
    image,
    showImages,
    isOpen,
    postCheck,
    show,
    inputSearch,
    date,
    searchMap,
    info,
    loading,
    authenticated,
  } = useSelector((state) => state);

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("access_token");
  //   console.log(accessToken);
  //   if (!accessToken) {
  //     dispatch(setAuthenticated(false));
  //   } else {
  //     axios
  //       .get("/auth", { headers: { Authorization: `Bearer ${accessToken}` } })
  //       .then(() => {
  //         dispatch(setAuthenticated(true));
  //       })
  //       .catch(() => {
  //         dispatch(setAuthenticated(false));
  //       });
  //   }
  // }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("/get/data");

      dispatch(setDatas(result.data.photodata));
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDiaryData = async () => {
    try {
      const result = await axios.get("/get/diary");
      dispatch(setDiaryData(result.data.diarydata));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    fetchData();
    fetchDiaryData();
  }, []);

  const reset = async (e) => {
    dispatch(setLoading(true));
    try {
      await axios
        .get("/reset")
        .then(() => {
          dispatch(setLoading(false));
          dispatch(setOpen(true));
          dispatch(setPostCheck({ message: "초기화가 되었습니다", url: "" }));
          dispatch(setShow(false));
          dispatch(setInput({ title: "", description: "" }));
          dispatch(setSearchMap(""));
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalSubmit = () => {
    dispatch(setOpen(false));
    dispatch(setShowImages([]));
    fetchData();
    fetchDiaryData();
  };

  const handleRequestCancel = () => {
    dispatch(setOpen(false));
    fetchData();
    fetchDiaryData();
  };

  const handleShow = () => {
    dispatch(setShow(true));
  };

  const handleHide = () => {
    dispatch(setShow(false));
  };

  const dateChange = (ranges) => {
    dispatch(
      setDate({
        startDate: ranges["selection"].startDate,
        endDate: ranges["selection"].endDate,
        key: ranges["selection"].key,
      })
    );
  };

  const deleteImgHandle = async (idx) => {
    try {
      await axios
        .post("/delete", { idx: idx })
        .then((result) => {
          dispatch(setOpen(true));
          dispatch(setPostCheck({ message: "이미지를 삭제했습니다", url: "" }));
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setInput({
        ...input,
        [name]: e.target.value,
      })
    );
  };

  const onImageChange = (e) => {
    if (e.target.files) {
      const uploadFile = e.target.files;
      dispatch(setImage(uploadFile));

      const imageLists = e.target.files;
      let imageUrlLists = [...showImages];

      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }

      if (imageUrlLists.length > 10) {
        imageUrlLists = imageUrlLists.slice(0, 10);
      }

      dispatch(setShowImages(imageUrlLists));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    try {
      if (
        input.title == "" ||
        input.description == "" ||
        searchMap == "" ||
        image.length == 0
      ) {
        dispatch(setOpen(true));
        dispatch(
          setPostCheck({
            message: "등록을 실패했습니다. 다시 등록해주세요",
            url: "add",
          })
        );
        dispatch(setShow(false));
        return;
      } else {
        formData.append("title", input.title);
        formData.append("description", input.description);
        formData.append(
          "startdate",
          date.startDate.toISOString().split("T")[0]
        );
        formData.append("enddate", date.endDate.toISOString().split("T")[0]);
        formData.append("address", info.place_name);

        for (let i = 0; i < image.length; i++) {
          formData.append("image", image[i]);
        }

        dispatch(setLoading(true));
        await axios
          .post("/insert/post", formData)
          .then(() => {
            dispatch(setLoading(false));
            dispatch(setOpen(true));
            dispatch(
              setPostCheck({ message: "추억이 등록되었습니다", url: "" })
            );
            dispatch(setInput({ title: "", description: "" }));
            dispatch(setShow(false));
            dispatch(setShowImages([]));
            dispatch(setSearchMap(""));
            if (fileInput && fileInput.current) {
              fileInput.current.value = "";
            }
            navigate("/");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeSearch = (e) => {
    dispatch(setInputSearch(e.target.value));
  };

  const handleSearch = async (e) => {
    setLoading(true);
    console.log(inputSearch);
    await axios
      .post("/search", { keyword: inputSearch })
      .then((result) => {
        setLoading(false);
        if (result.data.data.length == 0) {
          dispatch(setOpen(true));
          dispatch(
            setPostCheck({ message: "찾으시는 추억이 없습니다", url: "" })
          );
          dispatch(setInputSearch(""));
          search.current.value = "";
        } else {
          dispatch(setDatas(result.data.data));
          dispatch(setInputSearch(""));
          search.current.value = "";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const slideTransition = {
    classNames: "slide",
    timeout: { enter: 700, exit: 400 },
  };

  return (
    <>
      {accessToken ? (
        <Header
          show={show}
          handleShow={handleShow}
          handleHide={handleHide}
          reset={reset}
        />
      ) : (
        ""
      )}

      <Container style={{ paddingBottom: "80px", overflow: "hidden" }}>
        {/* <TransitionGroup>
          <CSSTransition
            key={location.key}
            {...slideTransition}
            mountOnEnter={false}
            unmountOnExit={true}
          > */}
        <Routes>
          {accessToken ? (
            <>
              <Route
                path="/"
                element={
                  <Main
                    deleteImgHandle={deleteImgHandle}
                    changeSearch={changeSearch}
                    handleSearch={handleSearch}
                    search={search}
                    dateChange={dateChange}
                  />
                }
              ></Route>
              <Route
                path="/add"
                element={
                  <Add
                    handleChange={handleChange}
                    onImageChange={onImageChange}
                    handleSubmit={handleSubmit}
                    fileInput={fileInput}
                    // handleDeleteImage={handleDeleteImage}
                    dateChange={dateChange}
                  />
                }
              ></Route>
              <Route path="/list" element={<List />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </>
          ) : (
            <>
              <Route path="/" element={<SignIn />}></Route>
              <Route path="/signIn" element={<SignIn />}></Route>
              <Route path="/signUp" element={<SignUp />}></Route>
            </>
          )}
        </Routes>
        {/* </CSSTransition>
        </TransitionGroup> */}
      </Container>
      {accessToken ? <Footer /> : ""}

      {loading ? <Loading /> : null}
      <MyModal
        isOpen={isOpen}
        onSubmit={handleModalSubmit}
        onRequestClose={handleRequestCancel}
      />
    </>
  );
}

export default App;
