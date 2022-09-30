import React from "react";
import styles from "../module.css/Main.module.css";

const QuestionBtn = () => {
  const onQuestion = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdNWhgZ5TpfGUB4Ikt0Ln1prGUSUYUeu486eBYW3g3t0-sdZQ/viewform?usp=pp_url"
    );
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
