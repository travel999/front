import React, { useEffect, useState } from "react";

import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import MapSearchNav from "./MapSearchNav";

const { kakao } = window;

//placeX : lat , placeY : lng >> 기억하기
const ScheduleMap = ({ nowDay }) => {
  const searchInit = {
    keyWord: null,
    pgn: null,
    result: [],
  };
  //HooK

  //State
  const [map, setMap] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [search, setSearch] = useState(searchInit);
  const [pin, setPin] = useState([]);
  const [menu, Setmenu] = useState(false);
  const [visible, Setvisible] = useState(false);

  //처음 지도 그리기
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, []);

  //마커 찍기
  useEffect(() => {
    pin.map((item) => {
      let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(item.lat, item.lng), // 마커를 표시할 위치
        title: item.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      });
      setMap(map);
    });
  }, [pin]);

  //마커 생성을 위한 배열 만들기
  const onMakeMarker = (placeName, placeX, palceY) => {
    setPin([
      ...pin,
      { day: nowDay, title: placeName, lat: palceY, lng: placeX },
    ]);
    const moveLatLon = new kakao.maps.LatLng(palceY, placeX);
    //마커 위치로 지도 화면 포커싱
    map.panTo(moveLatLon);
  };

  // 키워드 검색을 요청하는 함수입니다
  const searchPlaces = (e) => {
    if (e.key === "Enter") {
      setInputVal(e.target.value);
      const keyWord = inputVal.trim();
      if (keyWord.length === 0) {
        return;
      }
      // 장소 검색 객체를 생성합니다
      const ps = new kakao.maps.services.Places();
      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyWord, (data, status, pagination) => {
        setSearch({
          ...search,
          keyWord: keyWord,
          pgn: pagination,
          result: data,
        });
      });
    }
  };

  return (
    <div className={styels.mapWrap}>
      <Btn
        className={styels.searchBtn}
        onClick={() => {
          Setmenu((prev) => !prev);
          Setvisible((prev) => !prev);
        }}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Btn>
      <MapSearchNav
        visible={visible}
        menu={menu}
        onMakeMarker={onMakeMarker}
        searchPlaces={searchPlaces}
        searchData={search}
        day={nowDay}
        pin={pin}
      />
      <div id="map" style={{ width: "100%", height: "900px" }}></div>
    </div>
  );
};

export default ScheduleMap;
