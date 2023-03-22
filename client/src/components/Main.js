import React from "react";
import MainSlide from "./MainSlide";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";

function Main(props) {
  const { datas } = useSelector((state) => state);
  const { deleteImgHandle, changeSearch, handleSearch, search } = props;

  return (
    <div className={datas.length == 0 ? "nodata" : "main-wrapper"}>
      <MainSlide deleteImgHandle={deleteImgHandle} />
      <Search
        changeSearch={changeSearch}
        handleSearch={handleSearch}
        search={search}
      />
    </div>
  );
}

// const loading = async () => {
//   // loading some data

//   // call method to indicate that loading is done and we are ready to switch
//   loadingContext.done();
// };

export default Main;
