import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSchedule } from "../../redux/modules/MapSlice";
import DetailMapSearchNav from "./DetailMapSearchNav";
import PublicDeleteBtn from "../elements/PublicDeleteBtn";
import socket from "../../res/socket";
import styles from "../module.css/DetailSchedule.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const { kakao } = window;

//placeX : lat , placeY : lng >> 기억하기
const MobileDetailScheduleMap = ({ nowDay, data, setKey }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const existPins = useSelector((state) => state.kakaoMap.pin);

  //state 초기화 값
  const searchInit = {
    keyWord: null,
    pgn: null,
    result: [],
  };

  const [map, setMap] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [search, setSearch] = useState(searchInit);
  const [pin, setPin] = useState([]);
  const [menu, Setmenu] = useState(false);
  const [visible, Setvisible] = useState(false);

  const room = `formark${id}`;
  const sendMarker = (name, x, y) => {
    socket.emit("send_marker", name, x, y, nowDay, existPins, room);
  };

  //일정 정보 가져오기
  useEffect(() => {
    dispatch(getSchedule(id));
  }, []);

  //처음 지도 와 좌표 데이터 핀 같이 찍기
  useEffect(() => {
    if (data.pin.length !== 0) {
      const container = document.getElementById("map");
      const newData = data.pin.filter((item) => item.day === nowDay);
      const options = {
        center: new kakao.maps.LatLng(
          newData[newData.length - 1]?.lat,
          newData[newData.length - 1]?.lng
        ),
        level: 3,
      };
      const kakaoMap = new kakao.maps.Map(container, options);
      kakaoMap.setDraggable(false); //드래그 막기
      kakaoMap.setZoomable(false); //줌 막기
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
        setMap(kakaoMap);
      });
    }
  }, [data]);

  //상세보기에서 데이터가 하나도 없을때
  useEffect(() => {
    if (data.pin.length === 0) {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const kakaoMap = new kakao.maps.Map(container, options);
      kakaoMap.setDraggable(false); //드래그 막기
      kakaoMap.setZoomable(false); //줌 막기
      setMap(kakaoMap);
    }
  }, []);

  //신규 추가된 장소 마커 찍기
  useEffect(() => {
    pin.map((item) => {
      let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(item.lat, item.lng), // 마커를 표시할 위치
        title: item.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      });
    });
  }, [pin]);

  // socket useEffectㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  useEffect(() => {
    socket.emit("join_marker", room);
  }, []);

  useEffect(() => {
    socket.on("receive_marker", (name, x, y, nowDay, pins) => {
      console.log(name, x, y, nowDay, pins);
      forsocketMakeMarker(name, x, y, nowDay, pins);
    });
  }, [socket]);
  // -------------------------------------------------

  //마커 생성을 위한 배열 만들기
  const onMakeMarker = (placeName, placeX, palceY) => {
    setPin([
      ...data.pin,
      { day: nowDay, title: placeName, lat: palceY, lng: placeX },
    ]);
    const moveLatLon = new kakao.maps.LatLng(palceY, placeX);
    //마커 위치로 지도 화면 포커싱
    map.panTo(moveLatLon);
    toast.success(`여행 장소를 지정했습니다.`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // 키워드 검색을 요청하는 함수입니다
  const onSearchPlaces = (e) => {
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

  const forsocketMakeMarker = (placeName, placeX, palceY, nowday2, pins) => {
    setKey((prev) => (prev += 1));
    setPin([
      ...pins,
      { day: nowday2, title: placeName, lat: palceY, lng: placeX },
    ]);
    const moveLatLon = new kakao.maps.LatLng(palceY, placeX);
    map.panTo(moveLatLon);
  };

  return (
    <div className={styles.mapWrap}>
      <div
        className={styles.searchTitle}
        onClick={() => {
          Setmenu((prev) => !prev);
          Setvisible((prev) => !prev);
        }}
      >
        장소선택
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.searchBtn}
        />
      </div>

      <PublicDeleteBtn postId={id} />
      <DetailMapSearchNav
        visible={visible}
        menu={menu}
        onMakeMarker={onMakeMarker}
        sendMarker={sendMarker}
        onSearchPlaces={onSearchPlaces}
        searchData={search}
        day={nowDay}
        pin={pin}
      />
      <div id="map" className={styles.mapBox}></div>
    </div>
  );
};

export default MobileDetailScheduleMap;
