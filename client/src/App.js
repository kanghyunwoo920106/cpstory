import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainSlide from "./components/MainSlide";
import Write from "./components/Write";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MyModal from "./components/MyModal";
import List from "./components/List";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Add from "./components/Add";
import Main from "./components/Main";

function App() {
  const [datas, setDatas] = useState([]);
  const [input, setInput] = useState({ title: "", description: "" });
  const [image, setImage] = useState([]);
  const [showImages, setShowImages] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [postCheck, setPostCheck] = useState(0);
  const [show, setShow] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const fileInput = useRef();

  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const fetchData = async () => {
    try {
      const result = await axios.get("/getdata");
      setDatas(result.data.photodata);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModalSubmit = () => {
    setOpen(false);
    fetchData();
    setShowImages([]);
  };

  const handleRequestCancel = () => {
    setOpen(false);
    fetchData();
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };

  const reset = (e) => {
    e.preventDefault();
    axios
      .delete("/reset")
      .then((result) => {
        setOpen(true);
        setPostCheck(3);
        setShow(false);
        setInput({ title: "", description: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dateChange = (ranges) => {
    setDate({
      startDate: ranges["selection"].startDate,
      endDate: ranges["selection"].endDate,
      key: ranges["selection"].key,
    });
  };

  const deleteImgHandle = (idx) => {
    axios
      .post("/delete", { idx: idx })
      .then((result) => {
        setOpen(true);
        setPostCheck(2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: e.target.value,
    });
  };

  const onImageChange = (e) => {
    if (e.target.files) {
      const uploadFile = e.target.files;
      setImage(uploadFile);

      const imageLists = e.target.files;
      let imageUrlLists = [...showImages];

      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }

      if (imageUrlLists.length > 10) {
        imageUrlLists = imageUrlLists.slice(0, 10);
      }

      setShowImages(imageUrlLists);
    }
  };

  // const handleDeleteImage = (id) => {
  //   setShowImages(showImages.filter((_, index) => index !== id));
  //   setImage(showImages.filter((_, index) => index !== id));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (input.title == "" || input.description == "") {
      setOpen(true);
      setPostCheck(1);
      setShow(false);
      return;
    } else {
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("startdate", date.startDate.toISOString().split("T")[0]);
      formData.append("enddate", date.endDate.toISOString().split("T")[0]);
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }

      await axios
        .post("/insert", formData)
        .then((result) => {
          setOpen(true);
          setPostCheck(0);
          setInput({ title: "", description: "" });
          setShow(false);
          setShowImages([]);
          fileInput.current.value = "";
          fetchData();
        })
        .catch((err) => {
          setOpen(true);
          setPostCheck(1);
        });
    }
  };

  const changeSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = inputSearch;

    axios
      .post("/search", { keyword: keyword })
      .then((result) => {
        if (result.data.data.length == 0) {
          setOpen(true);
          setPostCheck(4);
        } else {
          setDatas(result.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BrowserRouter>
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
        <Routes>
          <Route
            path="/"
            element={
              <Main
                datas={datas}
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
                input={input}
                fileInput={fileInput}
                showImages={showImages}
                // handleDeleteImage={handleDeleteImage}
                date={date}
                dateChange={dateChange}
              />
            }
          ></Route>
          <Route path="/list" element={<List data={datas} />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
