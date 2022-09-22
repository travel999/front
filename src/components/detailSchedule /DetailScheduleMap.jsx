import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styels from "./Schedule.module.css";
import Btn from "../elements/Btn";

import DetailMapSearchNav from "./DetailMapSearchNav";
import PublicDeleteBtn from "../elements/PublicDeleteBtn";

const { kakao } = window;

//placeX : lat , placeY : lng >> 기억하기
const DetailScheduleMap = ({ nowDay, data }) => {
  const searchInit = {
    keyWord: null,
    pgn: null,
    result: [],
  };
  //HooK
  const { id } = useParams();

  //State
  const [map, setMap] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [search, setSearch] = useState(searchInit);
  const [pin, setPin] = useState([]);
  const [menu, Setmenu] = useState(false);
  const [visible, Setvisible] = useState(false);

  //처음 지도 와 좌표 데이터 핀 같이 찍기
  useEffect(() => {
    if (data.pin.length !== 0) {
      const container = document.getElementById("map");
      const newData = data.pin.filter((item) => item.day === nowDay);
      const options = {
        center: new kakao.maps.LatLng(newData[0]?.lat, newData[0]?.lng),
        level: 3,
      };
      const kakaoMap = new kakao.maps.Map(container, options);
      //처음 들어오는 저장된 마커 찍기
      newData.forEach((el) => {
        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          //마커가 표시 될 지도
          map: kakaoMap,
          //마커가 표시 될 위치
          position: new kakao.maps.LatLng(el.lat, el.lng),
          //마커에 hover시 나타날 title
          title: el.title,
        });
        marker.setMap(kakaoMap);
      });
    }
  }, [data]);

  // 2022.09.22 -> 안쓰지만 혹시 모르니 남겨둔다.
  // useEffect(() => {
  //   setPin(data.pin);
  // }, [data]);

  //마커 생성을 위한 배열 만들기
  const onMakeMarker = (placeName, placeX, palceY) => {
    setPin([
      ...data.pin,
      { day: nowDay, title: placeName, lat: palceY, lng: placeX },
    ]);
    const moveLatLon = new kakao.maps.LatLng(palceY, placeX);
    //마커 위치로 지도 화면 포커싱
    map.panTo(moveLatLon);
  };

  //신규 추가된 장소 마커 찍기
  useEffect(() => {
    pin
      // .filter((item) => item.day === nowDay)
      .map((item) => {
        let marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(item.lat, item.lng), // 마커를 표시할 위치
          title: item.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        });
        setMap(map);
      });
  }, [pin]);

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
        =
      </Btn>

      <PublicDeleteBtn postId={id} />
      <DetailMapSearchNav
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

export default DetailScheduleMap;
