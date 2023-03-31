import React, { useRef } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

function Search(props) {
  const { changeSearch, handleSearch, search } = props;
  return (
    <div className="search-wraper main-box">
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="검색"
          inputProps={{ "aria-label": "검색" }}
          onChange={changeSearch}
          ref={search}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="검색"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default Search;
