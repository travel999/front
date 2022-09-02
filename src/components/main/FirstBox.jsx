import React from "react";
import styles from "./Main.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toOpenPublic } from "../../redux/modules/MainSlice";

const FirstBox = () => {
  const dispatch = useDispatch();
  const myPosts = useSelector((state) => state.main.MyPostCards.data1);
  const state = useSelector((state) => state.main);

  const openPublic = () => {
    // value를 뭘 줘야하나
    dispatch(toOpenPublic());
  };

  return (
    <div className={styles.bicbox}>
      <div className={styles.toptext}>내 여행 일정</div>
      {myPosts?.length &&
        myPosts?.map((value) => {
          return (
            <div className={styles.card} key={value._id}>
              <img
                className={styles.img}
                src={
                  "https://forfiles.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-09-01+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+11.58.20.png"
                }
              />
              <div className={styles.content}>
                <div>{value.title}</div>
                <div className={styles.day}>
                  {value.day.length - 1}박 {value.day.length}일
                </div>
              </div>
              {value.openPublic ? (
                <div
                  onClick={() => {
                    openPublic();
                  }}
                  className={styles.openNor}
                >
                  🔓
                </div>
              ) : (
                <div
                  onClick={() => {
                    openPublic();
                  }}
                  className={styles.openNor}
                >
                  🔒
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default FirstBox;
