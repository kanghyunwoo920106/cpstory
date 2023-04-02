import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpen,
  setPostCheck,
  setModalOpen,
  setDiary,
} from "../store/store.js";
import { GetDiaryData } from "./GetDiaryData.js";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CalanderModal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Modal = (props) => {
  const { opens, close, header, selectedDate } = props;
  const { diaryData, diary, diaryKey } = useSelector((state) => state);
  const stKey = format(selectedDate, "d");
  const dispatch = useDispatch();
  const inputDiary = useRef(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
    textAlign: "center",
  };

  const getDiaryData = async () => {
    await GetDiaryData(dispatch);
  };

  const changeDiary = (e) => {
    dispatch(setDiary(e.target.value));
  };

  const handleClose = () => dispatch(setModalOpen(false));

  const handleCreate = () => {
    if (inputDiary.current.value != "") {
      console.log(diaryKey);
      axios
        .post("/api/insert/diary", {
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
          getDiaryData();
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
      .post("/api/update/diary", {
        diaryKey: diaryKey,
        diary: diary,
      })
      .then((result) => {
        dispatch(setOpen(true));
        dispatch(setPostCheck({ message: "일기가 수정되었습니다", url: "" }));
        dispatch(setModalOpen(false));
        getDiaryData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    axios
      .post("/api/delete/diary", {
        diaryKey: diaryKey,
      })
      .then((result) => {
        dispatch(setOpen(true));
        dispatch(
          setPostCheck({
            message: "일기가 삭제되었습니다",
            url: "",
          })
        );
        dispatch(setModalOpen(false));
        getDiaryData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const result = diaryData.filter((key) => {
    return key.diaryKey.toString() == stKey;
  });

  return (
    <CalanderModal
      open={opens}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h3"
          sx={{
            textAlign: "left",
            marginBottom: "15px",
          }}
        >
          {format(selectedDate, "yyyy-MM-dd")}
        </Typography>
        <TextField
          fullWidth
          label="내용"
          id="fullWidth"
          name="description"
          multiline
          rows={4}
          ref={inputDiary}
          defaultValue={result.length !== 0 ? result[0].one_write : ""}
          onChange={changeDiary}
        />
        <Box
          sx={{
            margin: "15px auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {result.length !== 0 ? (
            <Button
              onClick={handleEdit}
              variant="contained"
              sx={{
                flexGrow: 1,
              }}
            >
              수정
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              onClick={handleCreate}
              sx={{
                flexGrow: 1,
              }}
            >
              등록
            </Button>
          )}
          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{
              flexGrow: 1,
              margin: "auto 5px",
            }}
          >
            삭제
          </Button>
          <Button
            type="cancel"
            variant="contained"
            className="close"
            onClick={close}
            sx={{
              flexGrow: 1,
            }}
          >
            닫기
          </Button>
        </Box>
      </Box>
    </CalanderModal>
    // <div className={opens ? "openModal modal" : "modal"}>
    //   {opens ? (
    //     <section>
    //       <header>
    //         {header}
    //         <button className="close" onClick={close}>
    //           &times;
    //         </button>
    //       </header>
    //       <main>
    //         <Form.Group
    //           className="mb-3"
    //           controlId="exampleForm.ControlTextarea1"
    //         >
    //           <Form.Label>{format(selectedDate, "yyyy-MM-dd")}</Form.Label>

    //           <Form.Control
    //             as="textarea"
    //             rows={3}
    //             ref={inputDiary}
    //             defaultValue={result.length !== 0 ? result[0].one_write : ""}
    //             onChange={changeDiary}
    //           />
    //         </Form.Group>
    //       </main>
    //       <footer>
    //         {result.length !== 0 ? (
    //           <Button onClick={handleEdit}>수정</Button>
    //         ) : (
    //           <Button type="submit" onClick={handleCreate}>
    //             등록
    //           </Button>
    //         )}
    //         <Button onClick={handleDelete} style={{ marginLeft: "5px" }}>
    //           삭제
    //         </Button>
    //         <Button
    //           type="cancel"
    //           className="close"
    //           onClick={close}
    //           style={{ marginLeft: "5px" }}
    //         >
    //           닫기
    //         </Button>
    //       </footer>
    //     </section>
    //   ) : null}
    // </div>
  );
};

export default Modal;
