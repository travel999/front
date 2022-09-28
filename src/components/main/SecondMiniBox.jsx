import React from "react";
import Calendar from "../calendar/Calendar";
import styles from "../module.css/Main.module.css";

const SecondMiniBox = () => {
  return (
    <div className={`${styles.smallbox}`}>
      <Calendar />
    </div>
  );
};

export default SecondMiniBox;
