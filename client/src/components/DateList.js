import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useDispatch, useSelector } from "react-redux";

function DateList(props) {
  const { datas } = useSelector((state) => state);

  // 중복된 날짜를 찾아서 묶음으로 만듦
  const groups = datas.reduce((acc, data) => {
    const date =
      data.startdate.split("T")[0] + " ~ " + data.enddate.split("T")[0];
    const group = acc.find((group) => group.date === date);
    if (group) {
      group.items.push(data);
    } else {
      acc.push({
        date,
        items: [data],
      });
    }
    return acc;
  }, []);
  return (
    <div>
      <Tab.Container id="list-group-tabs-example">
        <ListGroup>
          {groups.map((group, index) => (
            <ListGroup.Item key={index}>
              <Nav.Link eventKey={`#${group.date}`}>{group.date}</Nav.Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
        {groups.map((group, index) => (
          <Tab.Content key={index}>
            <Tab.Pane eventKey={`#${group.date}`}>
              <Row>
                {group.items.map((data) => (
                  <Col sm={4} key={data.idx}>
                    <ListGroup>
                      <ListGroup.Item
                        action
                        href={`${data.idx}`}
                        onClick={(e) => e.preventDefault()}
                      >
                        <img
                          className="d-block w-100"
                          // src={require(`../../public/upload/${data.image}`)}
                          src={`http://3.34.46.36:8000/upload/${data.image}`}
                          alt="First slide"
                        />

                        <div className="carousel-caption">
                          <h3>{data.title}</h3>
                          <p>{data.description}</p>
                          <span className="date">
                            {data.startdate.split("T")[0]} ~{" "}
                            {data.enddate.split("T")[0]} / {data.address}
                          </span>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                ))}
              </Row>
              <Row>
                {group.items.map((data) => (
                  <Col sm={8} key={data.idx}>
                    <Tab.Content>
                      <Tab.Pane eventKey={`${data.idx}`}></Tab.Pane>
                    </Tab.Content>
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
          </Tab.Content>
        ))}
      </Tab.Container>
    </div>
  );
}

export default DateList;
