import React from "react";
import styles from "./Main.module.css";
import FirstBox from "./FirstBox";
import SecondBox from "./SecondBox";
import ThirdBox from "./ThirdBox";
import ProfileBox from "./ProfileBox";

const Main = () => {
  return (
    <>
      <div className={styles.mainbox}>
        <ProfileBox />
        <FirstBox />
        <SecondBox />
        <ThirdBox />
      </div>
    </>
  );
};

export default Main;
