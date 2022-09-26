import React from "react";
import styles from "./Main.module.css";

const QuestionBtn = () => {
  const onQuestion = () => {
    window.open("https://naver.com");
  };

  return (
    <div className={styles.postbtn} style={{ backgroundColor: "#a0c1ff" }}>
      <div
        className={styles.posttext}
        style={{ backgroundColor: "#a0c1ff", marginTop: "4px" }}
        onClick={() => {
          onQuestion();
        }}
      >
        설문조사 하기
      </div>
    </div>
  );
};

export default QuestionBtn;
