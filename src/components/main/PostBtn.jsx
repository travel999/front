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
      새로운 일정 등록하기
    </div>
  );
};

export default PostBtn;
