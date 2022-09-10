import React from "react";
import { useDispatch } from "react-redux";
import { searchText, refreshSearch } from "../../redux/modules/MainSlice";
import styles from "./Main.module.css";

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
      <div class="input-group"></div>
      <input className={styles.searchinputbox} ref={input_ref}></input>
      <button
        className={styles.searchbtn}
        onClick={() => {
          OnTosearch(input_ref.current.value);
        }}
      >
        검색
      </button>

      <button
        className={styles.refreshbtn}
        onClick={() => {
          OnRefresh();
        }}
      >
        다시
      </button>
    </div>
  );
};

export default SearchBar;
