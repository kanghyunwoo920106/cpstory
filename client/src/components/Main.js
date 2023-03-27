import React from "react";
import MainSlide from "./MainSlide";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { DateRange } from "react-date-range";
import { Calender } from "./Calender";

function Main(props) {
  const { datas, date } = useSelector((state) => state);
  const { deleteImgHandle, changeSearch, handleSearch, search, dateChange } =
    props;
  return (
    <div className={datas.length == 0 ? "nodata" : "main-wrapper"}>
      <MainSlide deleteImgHandle={deleteImgHandle} />
      <Search
        changeSearch={changeSearch}
        handleSearch={handleSearch}
        search={search}
      />
      <Calender />
    </div>
  );
}

export default Main;
