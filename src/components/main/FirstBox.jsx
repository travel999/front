import React from "react";
import styles from "./Main.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RandomSpic } from "./RandomPicture";

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
                <img className={styles.img} src={RandomSpic(idx)} alt="img" />
                <div className={styles.content}>
                  <div>{value.title}</div>
                  <div className={styles.traveldate}>
                    {value.date[0] + "~ " + value.date[1]}
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

{
  /* {value.openPublic ? (
                  <div
                    onClick={() => {
                      OnOpenPublic(value._id);
                    }}
                    className={styles.openNor}
                  >
                    🔒
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      OnOpenPublic(value._id);
                    }}
                    className={styles.openNor}
                  >
                    🔓
                  </div>
                )} */
}
