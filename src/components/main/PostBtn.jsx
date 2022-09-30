import React from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "../module.css/Main.module.css";

const PostBtn = () => {
  const navigate = useNavigate();

  const MobileSize = useMediaQuery({ maxWidth: 380 });

  return (
    <div
      onClick={() => {
        navigate("/write");
      }}
      className={styles.postbtn}
    >
      {MobileSize ? (
        <div className={styles.posttext}>
          여행 일정 추가 <span className={styles.plusfont}>+</span>
        </div>
      ) : (
        <div className={styles.posttext}>
          여행 일정 추가하기 <span className={styles.plusfont}>+</span>
        </div>
      )}
    </div>
  );
};

export default PostBtn;
