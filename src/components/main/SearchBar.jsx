import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { searchText, refreshSearch } from "../../redux/modules/MainSlice";
import styles from "./Main.module.css";

const SearchBar = ({ input_ref }) => {
  const dispatch = useDispatch();

  const refresh = () => {
    dispatch(refreshSearch());
  };

  const tosearch = (value) => {
    dispatch(searchText(value));
  };

  return (
    <div className={styles.searchbox}>
      <input className={styles.searchinputbox} ref={input_ref} />
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
