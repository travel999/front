import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { randomSpic } from "../../res/randomPicture";
import styles from "../module.css/Main.module.css";

const FirstBox = () => {
  const navigate = useNavigate();
  const myPosts = useSelector((state) => state.main.MyPostCards?.data1);

  const onGoDetailPage = (postId) => {
    navigate(`/schedulDetail/${postId}`);
  };

  return (
    <div className={styles.bicbox}>
      <div className={styles.toptext}>나의 여행 일정</div>
      <div className={styles.firstboxscroll}>
        {myPosts?.length &&
          myPosts?.map((value, idx) => {
            return (
              <div
                className={styles.card}
                key={value._id}
                onClick={() => onGoDetailPage(value._id)}
                style={{ cursor: "pointer" }}
              >
                <img className={styles.img} src={randomSpic(idx)} alt="img" />
                <div className={styles.content}>
                  <div style={{ fontWeight: "500" }}>{value.title}</div>
                  <div className={styles.traveldate}>
                    {value.date[0].slice(2) + "~ " + value.date[1].slice(2)}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FirstBox;
