import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useSelector, useDispatch } from "react-redux";
import KaKaoMap from "../components/KaKaoMap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { FilledInput } from "@mui/material";
import { Fab } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

function Add(props) {
  const { input, date, showImages } = useSelector((state) => state);

  let { handleChange, onImageChange, handleSubmit, fileInput, dateChange } =
    props;

  const useStyles = makeStyles(() => ({
    form: {
      paddingBottom: "100px",
    },
    uploadButton: {
      width: "100% !important",
    },
    box: {
      margin: "15px 0",
    },
  }));

  const classes = useStyles();

  return (
    <Form
      method="POST"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className={classes.form}
    >
      <Box
        sx={{
          maxWidth: "100%",
        }}
        className={classes.box}
      >
        <TextField
          fullWidth
          label="제목"
          id="fullWidth"
          name="title"
          onChange={handleChange}
          value={input.title}
        />
      </Box>
      <Box
        sx={{
          maxWidth: "100%",
        }}
        className={classes.box}
      >
        <TextField
          fullWidth
          label="내용"
          id="fullWidth"
          name="description"
          onChange={handleChange}
          value={input.description}
          multiline
          rows={4}
        />
      </Box>
      <Box
        sx={{
          maxWidth: "100%",
        }}
        className={classes.box}
      >
        <KaKaoMap />
      </Box>
      <Box
        sx={{
          maxWidth: "100%",
        }}
        className={classes.box}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateCalendar"]}>
            <DemoItem>
              <DateCalendar onChange={dateChange} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box
        sx={{
          maxWidth: "100%",
        }}
        className={classes.box}
      >
        <label htmlFor="upload-photo" className={classes.uploadButton}>
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={onImageChange}
            ref={fileInput}
            multiple
          />
          <Fab
            color="primary"
            size="small"
            component="span"
            aria-label="add"
            variant="extended"
            className={classes.uploadButton}
          >
            <AddIcon /> Upload photo
          </Fab>
        </label>
      </Box>

      <Box>
        {showImages.map((image, id) => (
          <div key={id} className="previewImg-wrap">
            <img src={image} alt={`${image}-${id}`} />
          </div>
        ))}
      </Box>

      <Button
        variant="outlined"
        type="submit"
        fullWidth
        startIcon={<SaveIcon />}
        sx={{
          borderRadius: "20px",
        }}
      >
        등록
      </Button>
    </Form>
  );
}

export default Add;
