import React from "react";
import { useDispatch } from "react-redux";
import {
  searchText,
  refreshSearch,
  firstsearch,
} from "../../redux/modules/MainSlice";
import styles from "./Main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({
  input_ref,
  setShowrecommend,
  searchPage,
  setSearchPage,
  beforeSearched,
  setBeforeSearched,
  topRef,
}) => {
  const dispatch = useDispatch();

  const OnRefresh = () => {
    // dispatch(refreshSearch());
    // setShowrecommend(true);
    // input_ref.current.value = "";
    window.location.reload();
  };

  const OnTosearch = (input) => {
    if (beforeSearched !== input) {
      console.log("첫검색");
      // window.scrollTo({ top: 0, behavior: "smooth" });
      onHomeClick();
      setBeforeSearched(input);
      dispatch(firstsearch([input, 1]));
      setShowrecommend(false);
      setSearchPage(1);
    }
  };

  const executeScroll = () => {
    window.scrollTo({ top: topRef.current.offsetTop, behavior: "smooth" });
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
