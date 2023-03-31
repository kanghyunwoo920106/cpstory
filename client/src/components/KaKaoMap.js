/*global kakao*/
import React, { useEffect, useState, useRef } from "react";
// import { Button, Form } from "react-bootstrap";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchMap,
  setMarkers,
  setInfo,
  setAddress,
  setPopShow,
} from "../store/store.js";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Popover from "react-bootstrap/Popover";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function KaKaoMap() {
  const { kakao } = window;
  const [map, setMap] = useState();
  const { searchMap, markers, info, address, popShow } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const search = useRef(null);
  const placename = useRef(null);

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    if (searchMap != "") {
      ps.keywordSearch(searchMap, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            });
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          dispatch(setMarkers(markers));

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
          dispatch(setAddress(data));
        }
      });
    }
  }, [searchMap]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const mapChange = (e) => {
    dispatch(setSearchMap(e.target.value));

    if (search.current.value === "") {
      setAnchorEl(null); // 팝업을 닫음
      setPopShow(false);
    } else {
      setAnchorEl(search.current); // 검색 필드를 기준으로 팝업 위치를 설정
      setPopShow(true);
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: "100%" }} mt={2}>
        <TextField
          fullWidth
          label="장소검색"
          id="fullWidth"
          onChange={mapChange}
          ref={search}
          aria-describedby={id}
        />
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        variant="popover"
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {/* <Typography sx={{ p: 2 }}> */}
        {address.map((data, index) => {
          return (
            <ul className="address-list-wrap" key={index}>
              <li
                onClick={(e) => {
                  dispatch(setInfo(data));
                  dispatch(setPopShow(false));
                  search.current.value = data.place_name;
                }}
                ref={placename}
              >
                {data.place_name}
              </li>
              <li>{data.address_name}</li>
              <li>
                <a href={data.place_url}> {data.place_url}</a>
              </li>
            </ul>
          );
        })}
        {/* </Typography> */}
      </Popover>
      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "350px",
          zIndex: 0,
        }}
        level={6}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            image={{
              src: "https://xkaizew.hgodo.com/uploads/marker.jpg", // 마커이미지의 주소입니다
              size: {
                width: 24,
                height: 30,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
            onClick={(e) => {
              dispatch(setInfo(marker));
            }}
          >
            {info && info.content === marker.content && (
              <div
                className="qweqwe"
                style={{ color: "#fff", backgroundColor: "#f93737" }}
              >
                {marker.content}
              </div>
            )}
          </MapMarker>
        ))}
      </Map>
    </>
  );
}

export default KaKaoMap;
