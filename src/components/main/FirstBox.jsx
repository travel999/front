import React from "react";
import styles from "./FirstBox.module.css";
import PostCard from "../detail/PostCard";

const FirstBox = () => {
  return (
    <div className={styles.bicbox}>
      <div className={styles.toptext}>내 여행 일정</div>
      <PostCard />
    </div>
  );
};

export default FirstBox;
