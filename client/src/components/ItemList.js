import React from "react";
import { useSelector } from "react-redux";

function ItemList(props) {
  const { datas } = useSelector((state) => state);

  return (
    <div>
      {data.image.split(".")[1] === "mp4" ? (
        <video
          // src={require(`../../public/upload/${data.image}`)}
          src={`http://15.165.77.113:8000/upload/${data.image}`}
          autoPlay
          loop
          controls
          style={{ width: "100%" }}
        />
      ) : (
        <img
          className="d-block w-100"
          // src={require(`../../public/upload/${data.image}`)}
          src={`http://15.165.77.113:8000/upload/${data.image}`}
          alt="First slide"
        />
      )}
      ;
      <div className="carousel-caption">
        <h3>{data.title}</h3>
        <p>{data.description}</p>
        <span className="date">
          {data.startdate.split("T")[0]} ~ {data.enddate.split("T")[0]} /{" "}
          {data.address}
        </span>
      </div>
      ;
    </div>
  );
}

export default ItemList;
