import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../../redux/modules/MainSlice";
import styles from "./Detail.module.css";
import duckfoot from "../../res/img/duck/duckfoot-1.png";

const Detail = () => {
  const dispatch = useDispatch();
  const likecard = useSelector((state) => state.main.MyPostCards.data2);
  console.log(likecard);

  useEffect(() => {
    dispatch(getCards());
  }, []);

  return (
    <>
      <div className={styles.headtitle}>내가 찜한 여행 일정</div>
      <div className={styles.bicbox}>
        {likecard?.map((value) => {
          return (
            <div key={value._id} className={styles.cardbox}>
              <div className={styles.daypin}>
                <div className={styles.title}>{value.title}</div>
                <span>
                  <img
                    src={duckfoot}
                    alt="duckfoot"
                    className={styles.duckfoot}
                  />{" "}
                  {value.like}
                </span>
              </div>
              <div className={styles.space}>
                <span>
                  <div>{value.date[0] + "~ " + value.date[1]}</div>
                </span>
              </div>
              <div className={styles.daypin}>
                <div className={styles.bicspaceleft}>
                  {value?.day1 ? (
                    <div className={styles.whatday}>DAY 1</div>
                  ) : null}
                  {value?.day1?.pin.map((value) => {
                    return (
                      <div key={value.day + value.lat}>
                        <div
                          className={`${styles.fontsize} ${styles.spaceleft}`}
                        >
                          {value.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.bicspaceleft}>
                  {value?.day2 ? (
                    <div className={styles.whatday}>DAY 2</div>
                  ) : null}
                  {value?.day2?.pin.map((value) => {
                    return (
                      <div key={value.day + value.lat}>
                        <div
                          className={`${styles.fontsize} ${styles.spaceleft}`}
                        >
                          {value.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {value?.day1 ? <div className={styles.dotdot}>...</div> : null}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Detail;
