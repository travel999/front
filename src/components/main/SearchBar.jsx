import React from "react";
import { useDispatch } from "react-redux";
import { searchText, refreshSearch } from "../../redux/modules/MainSlice";
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
}) => {
  const dispatch = useDispatch();

  const OnRefresh = () => {
    dispatch(refreshSearch());
    setShowrecommend(true);
    input_ref.current.value = "";
  };

  const OnTosearch = (input) => {
    dispatch(searchText([input, searchPage]));
    setShowrecommend(false);
    setSearchPage((prev) => prev + 1);
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
