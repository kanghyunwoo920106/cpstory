import React from "react";
import { BiHomeAlt2, BiCoinStack, BiBellMinus } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import { CgAddR, CgProfile } from "react-icons/cg";
import { Link, NavLink } from "react-router-dom";

function Footer(props) {
  return (
    <div className="footer">
      <ul className="container">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? "active" : "";
            }}
          >
            <BiHomeAlt2 />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/list"
            className={({ isActive }) => {
              return isActive ? "active" : "";
            }}
          >
            <BsList />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add"
            className={({ isActive }) => {
              return isActive ? "active" : "";
            }}
          >
            <CgAddR />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => {
              return isActive ? "active" : "";
            }}
          >
            <CgProfile />
          </NavLink>
        </li>
        <li>
          <BiBellMinus />
        </li>
      </ul>
    </div>
  );
}

export default Footer;
