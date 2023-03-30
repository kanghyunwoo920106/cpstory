import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { setLoading, setOpen, setPostCheck } from "../store/store.js";
import { useDispatch } from "react-redux";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Couple Story
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
// const signInput = { firstName: "", lastName: "", id: "", password: "" };

export default function SignUp() {
  const [signInput, setSignInput] = useState({});
  const dispatch = useDispatch();

  const changeSignupInput = (e) => {
    setSignInput({
      ...signInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      signInput.firstName !== undefined &&
      signInput.lastName !== undefined &&
      signInput.id !== undefined &&
      signInput.password !== undefined
    ) {
      const data = {
        firstName: signInput.firstName,
        lastName: signInput.lastName,
        id: signInput.id,
        password: signInput.password,
      };

      dispatch(setLoading(true));

      await axios
        .post("/api/insert/signup", data, { withCredentials: true })
        .then((result) => {
          dispatch(setLoading(false));
          dispatch(setOpen(true));
          dispatch(
            setPostCheck({
              message: "회원가입이 완료되었습니다",
              url: "signIn",
            })
          );
        });
    } else {
      if (signInput.firstName === undefined) {
        dispatch(setLoading(false));
        dispatch(setOpen(true));
        dispatch(
          setPostCheck({ message: "첫번째 이름을 적어주세요", url: "signUp" })
        );
        return;
      }

      if (signInput.lastName === undefined) {
        dispatch(setLoading(false));
        dispatch(setOpen(true));
        dispatch(
          setPostCheck({ message: "두번째 이름을 적어주세요.", url: "signUp" })
        );
        return;
      }

      if (signInput.id === undefined) {
        dispatch(setLoading(false));
        dispatch(setOpen(true));
        dispatch(
          setPostCheck({ message: "아이디를 적어주세요.", url: "signUp" })
        );
        return;
      }

      if (signInput.password === undefined) {
        dispatch(setLoading(false));
        dispatch(setOpen(true));
        dispatch(
          setPostCheck({ message: "비밀번호를 적어주세요", url: "signUp" })
        );
        return;
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={changeSignupInput}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={changeSignupInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="id"
                  label="id"
                  name="id"
                  autoComplete="id"
                  onChange={changeSignupInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={changeSignupInput}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              등록
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/signIn" variant="body2">
                  로그인하러가기
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
