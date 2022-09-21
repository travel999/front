import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toLike } from "../../redux/modules/MainSlice";
import styles from "./Main.module.css";
import SecondMiniBox from "./SecondMiniBox";
import duckfoot from "../../res/img/duck/duckfoot-4.png";
import { RandomSpic2 } from "./RandomPicture";

const SecondBox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const likePosts = useSelector((state) => state.main.MyPostCards.data2);

  const Onlike = (value) => {
    dispatch(toLike(value));
  };

  const onGoDetailPage = (postId) => {
    navigate(`/schedulDetail/${postId}`);
  };

  return (
    <div style={{ zIndex: "5" }}>
      <div className={`${styles.bicbox2}`}>
        <div className={styles.toptext}>찜한 일정</div>
        <div className={styles.searchboxscroll}>
          {likePosts?.length &&
            likePosts?.map((value, idx) => {
              return (
                <div className={styles.card} key={"SB" + value._id}>
                  <img
                    className={styles.img}
                    src={RandomSpic2(idx)}
                    alt="img"
                    onClick={() => {
                      onGoDetailPage(value._id);
                    }}
                  />
                  <div className={styles.content2}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        onClick={() => {
                          onGoDetailPage(value._id);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {value.title}
                      </div>
                      <div
                        onClick={() => {
                          Onlike(value._id);
                        }}
                        className={`${styles.cursor} ${styles.heart}`}
                        style={{ marginTop: "-7px" }}
                      >
                        <img
                          src={duckfoot}
                          className={styles.duckfoot}
                          alt="duckfoot"
                        />{" "}
                        {value.like}
                      </div>
                    </div>
                    <div
                      className={styles.traveldate}
                      style={{ marginTop: "0.3vh" }}
                    >
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
