import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDayPlaceData } from "../../redux/modules/MapSlice";
import styled from "styled-components";
import styles from "../module.css/DetailSchedule.module.css";
import { toast } from "react-toastify";

const DetailMapSearchNav = ({
  visible,
  menu,
  onSearchPlaces,
  onMakeMarker,
  sendMarker,
  searchData,
  day,
  pin,
}) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.kakaoMap.members);
  const nickname = localStorage.getItem("nickname");
  //좌표 전역 스테이지로 올려주기
  useEffect(() => {
    dispatch(getDayPlaceData(pin));
  }, [pin]);

  // 마커 보내는 부분
  const OnMakeMarkers = (name, x, y) => {
    if (members?.includes(nickname)) {
      onMakeMarker(name, x, y);
      sendMarker(name, x, y);
    } else {
      toast.success(`일정을 추가할 권한이 없습니다.`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <MapSearchDiv>
      <SearchDiv visible={visible} menu={menu}>
        <div className="searchArea">
          <span>검색</span>
          <input
            type="text"
            name="keyword"
            id="keyword"
            size="15"
            autoComplete="off"
            onKeyDown={onSearchPlaces}
            className={styles.title}
            placeholder="장소 선택"
            required
          />
        </div>

        <div className="placeResult">
          {searchData.result.map((item) => {
            return (
              <div key={item.id}>
                <h4>{item.place_name}</h4>
                <button
                  name={day}
                  value={item.x}
                  onClick={() => OnMakeMarkers(item.place_name, item.x, item.y)}
                >
                  선택
                </button>
              </div>
            );
          })}
        </div>
      </SearchDiv>
    </MapSearchDiv>
  );
};

export default DetailMapSearchNav;

const MapSearchDiv = styled.div`
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.5);
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const SearchDiv = styled.div`
  width: 300px;
  height: 85%;
  overflow-y: auto;
  width: ${({ menu }) => (menu ? "300px" : null)};
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  transition: width 400ms ease-in-out;
  background-color: #ffffff;
  position: absolute;
  top: 11%;
  margin-left: 0%;
  margin-top: -2%;
  font-size: 15px;
  z-index: 99;
  text-align: center;
  padding: 0 0 40px 0;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  /* 모바일 반응형 430 x 844 : 아이폰 pro 도 접근할 수 있도록 처리함*/
  @media only screen and (max-width: 430px) {
    width: 60vw;
    position: absolute;
    top: auto;
    left: -0.3rem;
    margin-top: 40px;
    height: 70vh;
    border-radius: 15px;
  }

  div.searchArea {
    display: flex;
    justify-content: space-around;
    margin: 0.5rem;
  }
  & > div.searchArea > span {
    line-height: 1.4rem;
    font-weight: bold;
    margin: 0.5rem;
  }

  & > div.searchArea > input {
    width: 60%;
    height: 36px;
    border-radius: 22px;
    padding: 0 0.5rem;
    border: 1px solid #ffc51c;
  }
  & > div.placeResult > div {
    display: flex;
    align-items: center;
    padding: 1rem;
    font-size: 15px;
  }
  & > div.placeResult > div:hover {
    background-color: #eeee;
  }
  & > div.placeResult > div > button {
    border: none;
    background-color: yellowgreen;
    border-radius: 5px;
    margin: 0 0 0 1rem;
    color: #ffff;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
  }
  & > div.placeResult > div > button:hover {
    background-color: blue;
    cursor: pointer;
  }
`;
