import React from "react";
import styles from "./Main.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toOpenPublic } from "../../redux/modules/MainSlice";
import { useNavigate } from "react-router-dom";

const FirstBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myPosts = useSelector((state) => state.main.MyPostCards.data1);

  // 공개하기
  // const OnOpenPublic = (value) => {
  //   dispatch(toOpenPublic(value));
  // };

  //조회하기
  const onGoDetailPage = (postId) => {
    navigate(`/schedulDetail/${postId}`);
  };

  return (
    <div className={styles.bicbox}>
      <div className={styles.toptext}>나의 여행 일정</div>
      <div className={styles.firstboxscroll}>
        {myPosts?.length &&
          myPosts?.map((value) => {
            return (
              <div
                className={styles.card}
                key={value._id}
                onClick={() => onGoDetailPage(value._id)}
              >
                <img
                  className={styles.img}
                  src={
                    "https://forfiles.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-09-01+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+11.58.20.png"
                  }
                  alt="img"
                />
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
