import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../../redux/modules/MainSlice";
import styles from "./Detail.module.css";
import duckfoot from "../../res/img/duck/duckfoot-1.png";

const Detail = () => {
  const dispatch = useDispatch();
  const likecard = useSelector((state) => state.main.MyPostCards.data2);

  useEffect(() => {
    dispatch(getCards());
  }, []);

  return (
    <>
      <div className={styles.headtitle}>내가 좋아요 한 여행 일정</div>
      <div className={styles.bicbox}>
        {likecard?.map((value) => {
          return (
            <div key={value._id} className={styles.cardbox}>
              <div className={styles.title}>{value.title}</div>
              <div className={styles.space}>
                <span>
                  <div>{value.date[0] + "~ " + value.date[1]}</div>
                </span>
                <span>
                  <img
                    src={duckfoot}
                    alt="duckfoot"
                    className={styles.duckfoot}
                  />{" "}
                  {value.like}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Detail;
