import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";

const PostBtn = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/write");
      }}
      className={styles.postbtn}
    >
      <div className={styles.posttext}>
        여행 일정 추가하기 <span className={styles.plusfont}>+</span>
      </div>
    </div>
  );
};

export default PostBtn;
