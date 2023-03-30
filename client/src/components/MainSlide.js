import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { MdClear } from "react-icons/md";
import { useSelector } from "react-redux";

function MainSlide(props) {
  const [index, setIndex] = useState(0);
  const { datas } = useSelector((state) => state);

  let { deleteImgHandle } = props;

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      indicators={false}
      className="main-box"
    >
      {datas.map((data, index) => {
        return (
          <Carousel.Item key={data.idx}>
            <MdClear
              onClick={() => deleteImgHandle(data.idx)}
              style={{
                position: "absolute",
                right: "3%",
                top: "3%",
                cursor: "pointer",
                zIndex: "10",
                backgroundColor: "white",
                borderRadius: "1px",
                width: "18px",
                height: "18px",
                padding: "5px",
              }}
              size="20"
              color="#ff1a0a"
            />
            {data.image.split(".")[1] == "mp4" ? (
              <video
                src={require(`${process.env.REACT_APP_IMAGE_PATH}/${data.image}`)}
                autoPlay
                loop
                controls
                style={{ width: "100%" }}
              />
            ) : (
              <img
                className="d-block w-100"
                src={require(`${process.env.REACT_APP_IMAGE_PATH}/${data.image}`)}
                alt="First slide"
              />
            )}

            <Carousel.Caption>
              <h3>{data.title}</h3>
              <p>{data.description}</p>
              <span className="date">
                {data.startdate.split("T")[0]} ~ {data.enddate.split("T")[0]} /{" "}
                {data.address}
              </span>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default MainSlide;
