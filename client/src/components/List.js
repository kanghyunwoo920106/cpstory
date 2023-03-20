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
            {/* <img src={require(`../../public/upload/${data.image}`)} /> */}
            <img src={`http://3.35.174.0/upload/${data.image}`} />
          </Row>
        );
      })}
    </Container>
  );
}

export default List;
