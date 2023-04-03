import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

import { setFooterNavState } from "../store/store.js";

function Footer() {
  const { footerNavState } = useSelector((state) => state);
  const dispatch = useDispatch();
  const locate = useLocation();

  const handleChange = (event, newValue) => {
    dispatch(setFooterNavState(newValue));
  };

  const useStyles = makeStyles(() => ({
    footer: {
      zIndex: 9999,
    },
  }));

  const classes = useStyles();

  return (
    <BottomNavigation
      variant="bottomNavi"
      value={footerNavState}
      onChange={handleChange}
      className={classes.footer}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        component={Link}
        to="/"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="List"
        value="list"
        component={Link}
        to="/list"
        icon={<MenuIcon />}
      />
      <BottomNavigationAction
        label="Add"
        value="add"
        component={Link}
        to="/add"
        icon={<AddBoxOutlinedIcon />}
      />
      <BottomNavigationAction
        label="DateList"
        value="datelist"
        component={Link}
        to="/datelist"
        icon={<FolderIcon />}
      />
    </BottomNavigation>
  );
}

export default Footer;
