import React from "react";
import { useDispatch } from "react-redux";
import { firstsearch, refreshSearch } from "../../redux/modules/MainSlice";
import styles from "./Main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({
  input_ref,
  setShowrecommend,
  setSearchPage,
  beforeSearched,
  setBeforeSearched,
  topRef,
}) => {
  const dispatch = useDispatch();

  const OnRefresh = () => {
    dispatch(refreshSearch());
    setShowrecommend(true);
    input_ref.current.value = "";
    onHomeClick();
    setSearchPage(1);
    // window.location.reload();
  };

  const OnTosearch = (input) => {
    if (beforeSearched !== input) {
      // 기존 검색과 다를때
      onHomeClick(); // 맨위로 스크롤링
      setBeforeSearched(input); // input값 기록
      dispatch(firstsearch([input, 1])); // 다시검색
      setShowrecommend(false); // 검색창으로 변환
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
        ref={input_ref}
        onKeyPress={(e) => {
          if (e.key === "Enter") OnTosearch(input_ref.current.value);
        }}
      />
      <button
        className={styles.searchbtn}
        onClick={() => {
          OnTosearch(input_ref.current.value);
        }}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <button
        className={styles.refreshbtn}
        onClick={() => {
          OnRefresh();
        }}
      >
        <FontAwesomeIcon icon={faRotateRight} />
      </button>
    </div>
  );
};

export default SearchBar;
