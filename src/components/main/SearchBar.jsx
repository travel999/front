import React from "react";
import { useDispatch } from "react-redux";
import { searchText, refreshSearch } from "../../redux/modules/MainSlice";
import styles from "./Main.module.css";

const SearchBar = ({ input_ref, setShowrecomm, searchPage, setSearchPage }) => {
  const dispatch = useDispatch();

  const OnRefresh = () => {
    dispatch(refreshSearch());
    setShowrecomm(true);
    input_ref.current.value = "";
  };

  const OnTosearch = (input) => {
    dispatch(searchText([input, searchPage]));
    setShowrecomm(false);
    setSearchPage((prev) => prev + 1);
  };

  return (
    <div className={styles.searchbox}>
      <input className={styles.searchinputbox} ref={input_ref} />
      <button
        className={styles.searchbtn}
        onClick={() => {
          OnTosearch(input_ref.current.value);
        }}
      >
        입력
      </button>

      <button
        className={styles.refreshbtn}
        onClick={() => {
          OnRefresh();
        }}
      >
        ♻︎
      </button>
    </div>
  );
};

export default SearchBar;
