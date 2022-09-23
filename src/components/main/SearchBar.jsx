import React from "react";
import { useDispatch } from "react-redux";
import { firstSearch, refreshSearch } from "../../redux/modules/MainSlice";
import styles from "./Main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({
  inputRef,
  setShowRecommend,
  setSearchPage,
  beforeSearched,
  setBeforeSearched,
  topRef,
}) => {
  const dispatch = useDispatch();

  const onRefresh = () => {
    dispatch(refreshSearch());
    setShowRecommend(true);
    inputRef.current.value = "";
    onHomeClick();
    setSearchPage(1);
    // window.location.reload();
  };

  const onTosearch = (input) => {
    if (beforeSearched !== input) {
      // 기존 검색과 다를때
      onHomeClick(); // 맨위로 스크롤링
      setBeforeSearched(input); // input값 기록
      dispatch(firstSearch([input, 1])); // 다시검색
      setShowRecommend(false); // 검색창으로 변환
      setSearchPage(1); // 무한스크롤 페이지 1로
    }
  };

  const onHomeClick = () => {
    topRef.current?.scrollIntoView();
  };

  return (
    <div className={styles.searchbox}>
      <input
        className={styles.searchinputbox}
        ref={inputRef}
        onKeyPress={(e) => {
          if (e.key === "Enter") onTosearch(inputRef.current.value);
        }}
      />
      <button
        className={styles.searchbtn}
        onClick={() => {
          onTosearch(inputRef.current.value);
        }}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <button
        className={styles.refreshbtn}
        onClick={() => {
          onRefresh();
        }}
      >
        <FontAwesomeIcon icon={faRotateRight} />
      </button>
    </div>
  );
};

export default SearchBar;
