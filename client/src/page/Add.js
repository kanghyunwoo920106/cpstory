import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
import AddIcon from "@mui/icons-material/Add";

function Add(props) {
  const { input, date, showImages } = useSelector((state) => state);

  let { handleChange, onImageChange, handleSubmit, fileInput, dateChange } =
    props;

  const theme = createTheme({
    components: {
      Box: {
        variants: [
          {
            props: { variant: "box" },
            style: {
              margin: "15px",
            },
          },
        ],
      },
    },
  });

  return (
    <Form
      method="POST"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="mt-3"
    >
      <Box
        sx={{
          maxWidth: "100%",
        }}
        mt={2}
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
        mt={2}
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
        mt={2}
      >
        <KaKaoMap />
      </Box>
      <Box
        sx={{
          maxWidth: "100%",
        }}
        mt={2}
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
        mt={2}
      >
        <label htmlFor="upload-photo">
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
          >
            <AddIcon /> Upload photo
          </Fab>
        </label>
      </Box>

      <div>
        {showImages.map((image, id) => (
          <div key={id} className="previewImg-wrap">
            <img src={image} alt={`${image}-${id}`} />
          </div>
        ))}
      </div>

      <Button type="submit" className="add-submit-btn mt-3">
        글등록
      </Button>
    </Form>
  );
}

export default Add;
