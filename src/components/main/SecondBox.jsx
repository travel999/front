import React from "react";
import { useSelector } from "react-redux";
import styles from "./Main.module.css";
import SecondMiniBox from "./SecondMiniBox";

const SecondBox = () => {
  const likePosts = useSelector((state) => state.main.MyPostCards.data2);

  return (
    <div>
      <div className={`${styles.bicbox2}`}>
        <div className={styles.toptext}>좋아요한 일정</div>
        {likePosts?.length &&
          likePosts?.map((value) => {
            return (
              <div className={styles.card} key={value._id}>
                <img
                  className={styles.img}
                  src={
                    "https://forfiles.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-09-02+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+12.00.40.png"
                  }
                />
                <div className={styles.content}>
                  <div>{value.title}</div>
                  <div className={styles.day}>
                    {value.day.length - 1}박 {value.day.length}일
                  </div>
                </div>
                <div className={styles.heart}> ❤️ {value.like}</div>
              </div>
            );
          })}
      </div>
      <SecondMiniBox />
    </div>
  );
};

export default SecondBox;
