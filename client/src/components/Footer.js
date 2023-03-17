import React from "react";
import { BiHomeAlt2, BiCoinStack, BiBellMinus } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import { CgAddR } from "react-icons/cg";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <div className="footer">
      <ul className="container">
        <li>
          <Link to="/">
            <BiHomeAlt2 />
          </Link>
        </li>
        <li>
          <Link to="/list">
            <BsList />
          </Link>
        </li>
        <li>
          <Link to="/add">
            <CgAddR />
          </Link>
        </li>
        <li>
          <BiCoinStack />
        </li>
        <li>
          <BiBellMinus />
        </li>
      </ul>
    </div>
  );
}

export default Footer;
