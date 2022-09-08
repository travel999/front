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
    <div className={styles.bicbox}>
      {likecard?.map((value) => {
        return (
          <div key={value._id} className={styles.cardbox}>
            <div>{value.title}</div>
            <div>
              {value.day.length - 1}박 {value.day.length} 일
            </div>
            <div>❤️ {value.like}</div>
          </div>
        );
      })}
      <Chatting />
    </div>
  );
};

export default Detail;
