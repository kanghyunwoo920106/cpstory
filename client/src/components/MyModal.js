import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { setOpen } from "../store/store.js";

const MyModal = ({ onSubmit, onRequestClose }) => {
  const { postCheck } = useSelector((state) => state);
  const { open } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(setOpen(false));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {postCheck.message}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default MyModal;
