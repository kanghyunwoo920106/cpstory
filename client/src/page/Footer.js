import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function Footer() {
  const [value, setValue] = useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      variant="bottomNavi"
      value={value}
      onChange={handleChange}
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
        label="Folder"
        value="folder"
        component={Link}
        to="/profile"
        icon={<FolderIcon />}
      />
    </BottomNavigation>
  );
}

export default Footer;
