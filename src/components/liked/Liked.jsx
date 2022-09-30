import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCards } from "../../redux/modules/MainSlice";
import styles from "../module.css/Liked.module.css";
import duckfoot from "../../res/img/duck/duckfoot-1.png";

const Liked = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likecard = useSelector((state) => state.main.MyPostCards.data2);
  const tokenValue = localStorage.getItem("jwtToken");
  // 토큰없으면 로그인 페이지로
  useEffect(() => {
    if (!tokenValue) {
      navigate("/");
    }
  }, []);
  
  useEffect(() => {
    dispatch(getCards());
  }, []);

  const onGoDetail = (id) => {
    navigate(`/schedulDetail/${id}`);
  };

  return (
    <div className={styles.allBox}>
      <div className={styles.forScroll}>
        <div style={{ display: "flex" }}>
          <div className={styles.headtitle}>내가 찜한 여행 일정</div>
        </div>
        <div className={styles.bicbox}>
          {likecard?.length &&
            likecard?.map((value) => {
              return (
                <div
                  key={value._id}
                  className={styles.cardbox}
                  onClick={() => {
                    onGoDetail(value._id);
                  }}
                >
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
                    <div className={styles.bicspaceleft}>
                      {value?.day3?.pin.map((value) => {
                        return (
                          <div key={value.day + value.lay}>
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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Liked;
