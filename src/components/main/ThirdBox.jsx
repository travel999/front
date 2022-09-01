import React from "react";
import styles from "./FirstBox.module.css";
import SearchBar from "./SearchBar";

const ThirdBox = () => {
  return (
    <div>
      <div className={styles.bicbox}>
        <SearchBar />
        <div className={styles.toptext}>다른사람의 일정</div>
      </div>
    </div>
  );
};

export default ThirdBox;
