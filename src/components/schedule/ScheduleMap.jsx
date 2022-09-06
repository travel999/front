import React, { useEffect, useState } from "react";
import styels from "./Schedule.module.css";
import ScheduleWork from "./ScheduleWork";

const { kakao } = window;

const ScheduleMap = ({ day }) => {
  const searchInit = {
    keyWord: null,
    pgn: null,
    result: [],
  };

  const [map, setMap] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [search, setSearch] = useState(searchInit);
  const [pin, setPin] = useState([]);

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

  const onShowMarker = (placeX, palceY) => {
    console.log(placeX, palceY);
    // this.mapOption.center = {
    //   lat: placeX,
    //   lng: palceY,
    // };
    // //마커가 표시 될 위치
    // setPin({ ...pin, latlng: new kakao.maps.LatLng(placeX, palceY) });

    // console.log(pin);

    // let markerPosition = new kakao.maps.LatLng(placeX, palceY);

    // 마커를 생성
    // let marker = new kakao.maps.Marker({
    //   position: markerPosition,
    // });

    // 마커를 지도 위에 표시
    // marker.setMap(map);
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
    <div
      style={{
        width: "100%",
        display: "inline-block",
        marginLeft: "5px",
        marginRight: "5px",
      }}
    >
      <input
        type="text"
        name="keyword"
        id="keyword"
        size="15"
        onKeyUp={searchPlaces}
        className={styels.title}
        placeholder="장소 선택"
        required
      />
      <div className="placeResult">
        {search.result.map((item) => {
          return (
            <div key={item.id}>
              <h4>{item.place_name}</h4>
              <button onClick={() => onShowMarker(item.x, item.y)}>선택</button>
            </div>
          );
        })}
      </div>
      <div id="map" style={{ width: "99%", height: "500px" }}></div>

      <ScheduleWork day={day} />
    </div>
  );
};

export default ScheduleMap;
