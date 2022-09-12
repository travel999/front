import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../../redux/modules/MainSlice";
import Chatting from "../chat/Chatting";
import styles from "./Detail.module.css";

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
                <span>2022.09.11- 2022.09.15</span>
                <span>❤️ {value.like}</span>
              </div>
            </div>
          );
        })}
      </div>
      <Chatting />
    </>
  );
};

export default Detail;
