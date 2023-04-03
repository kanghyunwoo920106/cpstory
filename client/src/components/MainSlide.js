import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { makeStyles } from "@mui/styles";
import { Paper, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 600,
    position: "relative",
    overflow: "hidden",
    margin: "0 auto",
  },
  img: {
    display: "block",
    maxWidth: "100%",
    width: "auto",
    borderRadius: "10px",
  },
  nav: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#fff",
    opacity: 0.6,
    marginRight: 8,
    cursor: "pointer",
    transition: "opacity 0.2s",
    "&.active": {
      opacity: 1,
    },
  },
  box: {
    position: "absolute",
    bottom: "0%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: "16px 0",
    textAlign: "center",
  },
  center: {
    textAlign: "center",
  },
}));

const MainSlide = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const { datas } = useSelector((state) => state);
  let { deleteImgHandle } = props;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box className={classes.root}>
      <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
        {datas.map((data, index) => (
          <Paper key={data.idx} elevation={0} sx={{ position: "relative" }}>
            <ClearIcon
              onClick={() => deleteImgHandle(data.idx)}
              sx={{
                position: "absolute",
                right: "2%",
                top: "2%",
              }}
            />
            <img
              className={`${classes.img} d-block w-100`}
              // src={require(`../../public/upload/${data.image}`)}
              src={`http://3.34.46.36:8000/upload/${data.image}`}
              alt="First slide"
            />

            <div key={data.idx} className={classes.box}>
              <h3>{data.title}</h3>
              <p>{data.description}</p>
              <span className="date">
                {data.date.split("T")[0]} / {data.address}
              </span>
            </div>
          </Paper>
        ))}
      </SwipeableViews>
    </Box>
  );
};

export default MainSlide;
