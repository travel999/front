import React from "react";
import styles from "./SecondBox.module.css";
import SecondMiniBox from "./SecondMiniBox";

const SecondBox = () => {
  return (
    <div>
      <div className={`${styles.bicbox}`}>
        <div className={styles.toptext}>좋아요한 일정</div>
      </div>
      <SecondMiniBox />
    </div>
  );
};

export default SecondBox;
