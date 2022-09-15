import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toLike } from "../../redux/modules/MainSlice";
import styles from "./Main.module.css";
import SecondMiniBox from "./SecondMiniBox";
import duckfoot from "../../res/img/duck/duckfoot-1.png";

const SecondBox = () => {
  const dispatch = useDispatch();
  const likePosts = useSelector((state) => state.main.MyPostCards.data2);

  const Onlike = (value) => {
    dispatch(toLike(value));
  };

  return (
    <div style={{ zIndex: "5" }}>
      <div className={`${styles.bicbox2}`}>
        <div className={styles.toptext}>찜한 일정</div>
        <div className={styles.searchboxscroll}>
          {likePosts?.length &&
            likePosts?.map((value) => {
              return (
                <div className={styles.card} key={"SB" + value._id}>
                  <img
                    className={styles.img}
                    src={
                      "https://forfiles.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-09-02+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+12.00.40.png"
                    }
                  />
                  <div className={styles.content2}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>{value.title}</div>
                      <div
                        onClick={() => {
                          Onlike(value._id);
                        }}
                        className={`${styles.cursor} ${styles.heart}`}
                      >
                        <img src={duckfoot} className={styles.duckfoot} />{" "}
                        {value.like}
                      </div>
                    </div>
                    <div className={styles.traveldate}>
                      {value.date[0] + "~ " + value.date[1]}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <SecondMiniBox />
    </div>
  );
};

export default SecondBox;
