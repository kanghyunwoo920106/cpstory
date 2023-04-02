import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import DateList from "../components/DateList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  setAccessToken,
  setAuthenticated,
  setMemberInfo,
  setLoading,
  setOpen,
  setPostCheck,
  setUserData,
} from "../store/store.js";
import { removeToken } from "../utils/auth";

function Header(props) {
  const { show, handleShow, handleHide, reset } = props;
  const [appTitle, setAppTitle] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const title = useRef();
  const { memberInfo, userData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getInfo = async () => {
    const result = await axios.get("/api/get/info");
    setAppTitle(result.data.app_info[0].app_name);
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handleTitleModify = (e) => {
    title.current.readOnly = false;
    title.current.focus();
    setEditStatus(true);
  };

  const handleTitleSave = async (e) => {
    if (title.current.readOnly == false) {
      title.current.style = "border: none";
      await axios
        .post("/api/update/info", { appTitle: appTitle })
        .then((result) => {
          title.current.readOnly = true;
        });
      setEditStatus(false);
    }
  };

  const changeTitle = (e) => {
    setAppTitle(e.target.value);
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    removeToken();
    navigate("/");
  };

  return (
    <div>
      <Navbar key="md" bg="light" expand="md" className="mb-3">
        <Container fluid>
          <NavLink to="/" className="logo_title">
            <Navbar.Brand>{appTitle}</Navbar.Brand>
          </NavLink>

          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-md"
            onClick={handleShow}
          />

          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
            show={show}
            onHide={handleHide}
          >
            <Offcanvas.Header closeButton>
              <input
                type="text"
                id="offcanvasNavbarLabel-expand-md"
                className="app_title"
                ref={title}
                value={appTitle}
                onChange={changeTitle}
                readOnly
              />
              {/* {editStatus == false ? (
                <span
                  className="edit-title"
                  id="edit-title"
                  onClick={handleTitleModify}
                >
                  <FiArrowLeft></FiArrowLeft> 앱이름 수정
                </span>
              ) : (
                <span className="edit-title" onClick={handleTitleSave}>
                  <FiArrowRight></FiArrowRight> 저장
                </span>
              )} */}
              <Button className="" onClick={handleLogout}>
                로그아웃
              </Button>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <DateList />
              <Button className="reset-btn" onClick={reset} type="submit">
                초기화
              </Button>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;