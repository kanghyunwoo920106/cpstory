import React from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

function List(props) {
  const { datas } = useSelector((state) => state);
  return (
    <Container className="main-list-wrap">
      {datas.map((data, index) => {
        return (
          <Row key={data.idx}>
            {data.image.split(".")[1] == "mp4" ? (
              <video
                // src={require(`../../public/upload/${data.image}`)}
                src={`http://15.165.77.113:8000/upload/${data.image}`}
                autoPlay
                loop
                controls
                style={{ width: "100%" }}
              />
            ) : (
              // <img src={require(`../../public/upload/${data.image}`)} />
              <img src={`http://15.165.77.113:8000/upload/${data.image}`} />
            )}
          </Row>
        );
      })}
    </Container>
  );
}

export default List;
