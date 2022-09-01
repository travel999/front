import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { searchText, refreshSearch } from "../../redux/modules/MainSlice";
import styles from "./SearchBar.module.css";

const SearchBar = ({ input_ref }) => {
  const dispatch = useDispatch();

  const refresh = () => {
    dispatch(refreshSearch());
  };

  const tosearch = (value) => {
    dispatch(searchText(value));
  };

  return (
    <div className={styles.box}>
      <input className={styles.inputbox} ref={input_ref} />
      <button
        onClick={() => {
          tosearch(input_ref.current.value);
        }}
      >
        입력
      </button>
      <button
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
