/*global kakao*/
import React, { useEffect, useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
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
import Popover from "react-bootstrap/Popover";

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

  const mapChange = (e) => {
    dispatch(setSearchMap(e.target.value));
    if (search.current.value == "") {
      dispatch(setPopShow(false));
    } else {
      dispatch(setPopShow(true));
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">검색추천장소</Popover.Header>
      <Popover.Body>
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
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <Form.Group className="mt-3 mb-3">
        <OverlayTrigger
          show={popShow}
          trigger="click"
          placement="bottom-start"
          overlay={popover}
        >
          <Form.Control
            type="text"
            onChange={mapChange}
            placeholder="장소검색"
            ref={search}
          />
        </OverlayTrigger>
      </Form.Group>
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
