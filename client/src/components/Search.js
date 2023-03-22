import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";

function Search(props) {
  const { changeSearch, handleSearch, search } = props;
  return (
    <div className="search-wraper">
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={changeSearch}
          ref={search}
        />
        <Button variant="outline-success" onClick={handleSearch}>
          Search
        </Button>
      </Form>
    </div>
  );
}

export default Search;
