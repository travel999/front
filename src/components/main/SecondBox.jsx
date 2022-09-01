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
        {likePosts?.map((value) => {
          return (
            <div className={styles.card} key={value._id}>
              <div className={styles.img}></div>
              <div className={styles.content2}>
                <div>{value.title}</div>
                <div>
                  {value.day.length - 1}박 {value.day.length}일
                </div>
              </div>
              <div> ❤️ {value.like}</div>
            </div>
          );
        })}
      </div>
      <SecondMiniBox />
    </div>
  );
};

export default SecondBox;
