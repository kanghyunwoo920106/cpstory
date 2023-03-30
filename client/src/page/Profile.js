import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { setUserData } from "../store/store.js";
import { useSelector } from "react-redux";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginBottom: theme.spacing(2),
  },
}));

function Profile(props) {
  const classes = useStyles();
  const { userData, datas } = useSelector((state) => state);
  console.log(userData);
  return (
    <div className={classes.root}>
      {/* <Typography variant="h4">John Doe</Typography>
      <Typography variant="subtitle1">Software Engineer</Typography>
      <Typography variant="body1">
        Hi, my name is John Doe and I'm a software engineer with 5 years of
        experience. I love programming and building cool stuff with React and
        Material UI!
      </Typography> */}
      id: {userData.id}
    </div>
  );
}

export default Profile;
