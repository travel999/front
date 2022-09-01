import React from "react";
import styles from "./Main.module.css";
import { useSelector } from "react-redux";

const FirstBox = () => {
  const myPosts = useSelector((state) => state.main.MyPostCards.data1);

  return (
    <div className={styles.bicbox}>
      <div className={styles.toptext}>내 여행 일정</div>
      {myPosts?.map((value) => {
        return (
          <div className={styles.card} key={value._id}>
            <div className={styles.img}></div>
            <div className={styles.content}>
              <div>{value.title}</div>
              <div>
                {value.day.length - 1}박 {value.day.length}일
              </div>
            </div>
            {value.openPublic ? <div>공개</div> : <div>비공개</div>}
          </div>
        );
      })}
    </div>
  );
};

export default FirstBox;
