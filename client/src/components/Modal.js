import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpen,
  setPostCheck,
  setModalOpen,
  setDiary,
} from "../store/store.js";

const Modal = (props) => {
  const { opens, close, header, selectedDate } = props;
  const { diaryData, diary, diaryKey } = useSelector((state) => state);
  const stKey = format(selectedDate, "d");
  const dispatch = useDispatch();
  const inputDiary = useRef(null);

  const changeDiary = (e) => {
    dispatch(setDiary(e.target.value));
  };

  const handleCreate = () => {
    if (inputDiary.current.value != "") {
      axios
        .post("/insert/diary", {
          diaryKey: diaryKey,
          diary: diary,
          date: format(selectedDate, "yyyy-MM-dd"),
        })
        .then((result) => {
          dispatch(setOpen(true));
          dispatch(
            setPostCheck({ message: "일기가 등록되었습니다.", url: "" })
          );
          dispatch(setModalOpen(false));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(setOpen(true));
      dispatch(
        setPostCheck({
          message: "등록을 실패했습니다. 다시 등록해주세요.",
          url: "",
        })
      );
      dispatch(setModalOpen(false));
    }
  };

  const handleEdit = () => {
    axios
      .post("/update/diary", {
        diaryKey: diaryKey,
        diary: diary,
      })
      .then((result) => {
        dispatch(setOpen(true));
        dispatch(setPostCheck({ message: "일기가 수정되었습니다", url: "" }));
        dispatch(setModalOpen(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    axios
      .post("/delete/diary", {
        diaryKey: diaryKey,
      })
      .then((result) => {
        dispatch(setOpen(true));
        dispatch(setPostCheck({ message: "일기가 삭제되었습니다", url: "" }));
        dispatch(setModalOpen(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const result = diaryData.filter((key) => {
    return key.diaryKey.toString() == stKey;
  });

  return (
    <div className={opens ? "openModal modal" : "modal"}>
      {opens ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>{format(selectedDate, "yyyy-MM-dd")}</Form.Label>

              <Form.Control
                as="textarea"
                rows={3}
                ref={inputDiary}
                defaultValue={result.length !== 0 ? result[0].one_write : ""}
                onChange={changeDiary}
              />
            </Form.Group>
          </main>
          <footer>
            {result.length !== 0 ? (
              <Button onClick={handleEdit}>수정</Button>
            ) : (
              <Button type="submit" onClick={handleCreate}>
                등록
              </Button>
            )}
            <Button onClick={handleDelete} style={{ marginLeft: "5px" }}>
              삭제
            </Button>
            <Button
              type="cancel"
              className="close"
              onClick={close}
              style={{ marginLeft: "5px" }}
            >
              닫기
            </Button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
