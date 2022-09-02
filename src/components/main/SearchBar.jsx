import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { searchText, refreshSearch } from "../../redux/modules/MainSlice";
import styles from "./Main.module.css";

const SearchBar = ({ input_ref, setShowrecomm, searchPage, setSearchPage }) => {
  const dispatch = useDispatch();

  const refresh = () => {
    dispatch(refreshSearch());
    setShowrecomm(true);
    input_ref.current.value = "";
  };

  const tosearch = (input) => {
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
          tosearch(input_ref.current.value);
        }}
      >
        입력
      </button>

      <button
        className={styles.refreshbtn}
        onClick={() => {
          refresh();
        }}
      >
        ♻︎
      </button>
    </div>
  );
};

export default SearchBar;
