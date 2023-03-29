import React from "react";
import MainSlide from "../components/MainSlide";
import Search from "../components/Search";
import { useSelector } from "react-redux";
import { Calender } from "../components/Calender";

function Main(props) {
  const { datas } = useSelector((state) => state);
  const { deleteImgHandle, changeSearch, handleSearch, search } = props;
  return (
    <div className={datas.length === 0 ? "nodata" : "main-wrapper"}>
      {datas.length !== 0 ? (
        <>
          <MainSlide deleteImgHandle={deleteImgHandle} />
          <Search
            changeSearch={changeSearch}
            handleSearch={handleSearch}
            search={search}
          />
          <Calender />
        </>
      ) : (
        <>
          <div>추억을 등록해주세요</div>
        </>
      )}
    </div>
  );
}

export default Main;
