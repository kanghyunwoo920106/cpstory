import React from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

function List(props) {
  const { datas } = useSelector((state) => state);

  return (
    <Container className={datas.length == 0 ? "nodata" : "main-list-wrap"}>
      {datas.length != 0 ? (
        datas.map((data, index) => {
          return (
            <Row key={data.idx}>
              <img
                src={require(`../../public/upload/${data.image}`)}
                // src={`http://3.34.46.36:8000/upload/${data.image}`}
              />
            </Row>
          );
        })
      ) : (
        <div>추억을 등록해주세요</div>
      )}
    </Container>
  );
}

export default List;
