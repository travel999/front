import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styels from "./Schedule.module.css";

import { getDayPlaceData } from "../../redux/modules/MapSlice";
import { useEffect } from "react";

const MapSearchNav = ({
  visible,
  menu,
  searchPlaces,
  onMakeMarker,
  searchData,
  day,
  pin,
}) => {
  const dispatch = useDispatch();
  //좌표 전역 스테이지로 올려주기
  useEffect(() => {
    dispatch(getDayPlaceData({ day: day, pin: pin }));
  }, [pin]);

  return (
    <MapSearchDiv>
      <SearchDiv visible={visible} menu={menu}>
        <div className="searhArea">
          <span>장소 검색 :</span>
          <input
            type="text"
            name="keyword"
            id="keyword"
            size="15"
            autocomplete="off"
            onKeyUp={searchPlaces}
            className={styels.title}
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
                  // onClick={(e) => console.log(e.target.name)}
                  onClick={() => onMakeMarker(item.place_name, item.x, item.y)}
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

export default MapSearchNav;

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
  height: 100vh;
  width: ${({ menu }) => (menu ? "300px" : null)};
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  transition: width 400ms ease-in-out;
  background-color: white;
  position: absolute;
  top: 90px;
  font-size: 15px;
  z-index: 99;
  text-align: center;
  padding: 0 0 40px 0;
  display: flex;
  flex-direction: column;

  & > div.searchArea {
    display: flex;
    justify-content: space-around;
    margin: 0.5rem;
  }
  & > span {
    line-height: 2.5rem;
  }

  & > input {
    width: 74%;
    height: 36px;
    border-radius: 20px;
    border: 1px solid red;
    text-align: center;
    padding: 0.2rem;
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
