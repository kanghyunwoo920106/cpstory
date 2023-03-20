import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MyModal from "./components/MyModal";
import List from "./components/List";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Add from "./components/Add";
import Main from "./components/Main";
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
  setMarkers,
  setInfo,
} from "./store/store.js";

function App() {
  const fileInput = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    input,
    image,
    showImages,
    isOpen,
    postCheck,
    show,
    inputSearch,
    date,
    searchMap,
    markers,
    info,
  } = useSelector((state) => state);

  const fetchData = async () => {
    try {
      await axios.get("/getdata").then((result) => {
        dispatch(setDatas(result.data.photodata));
      });
    } catch (error) {
      console.error(error);
    }
  };

  const reset = async (e) => {
    try {
      await axios
        .get("/reset")
        .then((result) => {
          dispatch(setOpen(true));
          dispatch(setPostCheck(3));
          dispatch(setShow(false));
          dispatch(setInput({ title: "", description: "" }));
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModalSubmit = () => {
    dispatch(setOpen(false));
    dispatch(fetchData());
    dispatch(setShowImages([]));
    navigate("/");
  };

  const handleRequestCancel = () => {
    dispatch(setOpen(false));
    dispatch(fetchData());
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
    await axios
      .post("/delete", { idx: idx })
      .then((result) => {
        dispatch(setOpen(true));
        dispatch(setPostCheck(2));
      })
      .catch((err) => {
        console.error(err);
      });
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

  // const handleDeleteImage = (id) => {
  //   setShowImages(showImages.filter((_, index) => index !== id));
  //   setImage(showImages.filter((_, index) => index !== id));
  // };

  // // Handle form submission
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await fetch("/insert", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(input),
  //     });
  //     const data = await response.json();
  //     dispatch(setDatas([...datas, data]));
  //     dispatch(setInput({ title: "", description: "" }));
  //     dispatch(setImage([]));
  //     dispatch(setShowImages([]));
  //     dispatch(setOpen(false));
  //     dispatch(setPostCheck(0));
  //     dispatch(setShow(false));
  //     dispatch(setInputSearch(""));
  //     dispatch(
  //       setDate({
  //         startDate: new Date(),
  //         endDate: new Date(),
  //         key: "selection",
  //       })
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (input.title == "" || input.description == "") {
      dispatch(setOpen(true));
      dispatch(setPostCheck(1));
      dispatch(setShow(false));
      return;
    } else {
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("startdate", date.startDate.toISOString().split("T")[0]);
      formData.append("enddate", date.endDate.toISOString().split("T")[0]);
      formData.append("address", info.content);
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }

      try {
        await axios
          .post("/insert", formData)
          .then(() => {
            dispatch(setOpen(true));
            dispatch(setPostCheck(0));
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
      } catch (err) {
        dispatch(setOpen(true));
        dispatch(setPostCheck(1));
        console.log(err);
      }
    }
  };

  const changeSearch = (e) => {
    dispatch(setInputSearch(e.target.value));
  };

  const handleSearch = async (e) => {
    await axios
      .post("/search", { keyword: inputSearch })
      .then((result) => {
        if (result.data.data.length == 0) {
          dispatch(setOpen(true));
          dispatch(setPostCheck(4));
        } else {
          dispatch(setDatas(result.data.data));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const slideTransition = {
    classNames: "slide",
    timeout: { enter: 300, exit: 300 },
  };

  return (
    <>
      <Header
        MyModal={
          <MyModal
            isOpen={isOpen}
            onSubmit={handleModalSubmit}
            onRequestClose={handleRequestCancel}
            postCheck={postCheck}
          />
        }
        show={show}
        handleShow={handleShow}
        handleHide={handleHide}
        reset={reset}
      />
      <Container style={{ paddingBottom: "80px" }}>
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            {...slideTransition}
            mountOnEnter={false}
            unmountOnExit={true}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    deleteImgHandle={deleteImgHandle}
                    changeSearch={changeSearch}
                    handleSearch={handleSearch}
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
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Container>
      <Footer />
    </>
  );
}

export default App;
