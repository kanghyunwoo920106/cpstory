import React from "react";
import MainSlide from "./MainSlide";
import Search from "./Search";

function Main(props) {
  const { datas, deleteImgHandle, changeSearch, handleSearch } = props;
  return (
    <div className={datas.length == 0 ? "nodata" : "main-wrapper"}>
      <MainSlide datas={datas} deleteImgHandle={deleteImgHandle} />
      <Search changeSearch={changeSearch} handleSearch={handleSearch} />
    </div>
  );
}

export default Main;
