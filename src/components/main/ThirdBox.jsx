import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toLike } from "../../redux/modules/MainSlice";
import styles from "./Main.module.css";
import SearchBar from "./SearchBar";
import duckfoot from "../../res/img/duck/duckfoot-1.png";
import duckfootDark from "../../res/img/duck/duckfoot-2.png";

const ThirdBox = ({ obsRef, input_ref, searchPage, setSearchPage }) => {
  const dispatch = useDispatch();
  const searchdata = useSelector((state) => state.main.otherPeopleCards);
  const recommendData = useSelector((state) => state.main.MyPostCards.data3);

  const [showRecommend, setShowrecommend] = useState(true);

  const Onlike = (value) => {
    dispatch(toLike(value));
  };

  return (
    <div className={styles.bicbox}>
      <SearchBar
        input_ref={input_ref}
        searchPage={searchPage}
        setShowrecommend={setShowrecommend}
        setSearchPage={setSearchPage}
      />
      <div className={styles.onlyscroll}>
        {showRecommend
          ? recommendData?.length &&
            recommendData?.map((value) => {
              return (
                <div className={styles.contentbox} key={"TB" + value._id}>
                  <img
                    src="https://forfiles.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-09-09+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.41.18.png"
                    className={styles.bicimg}
                  ></img>
                  <div className={styles.thirdtext}>
                    <div>{value.title}</div>
                    {value.isLiked ? (
                      <div
                        onClick={() => {
                          Onlike(value._id);
                        }}
                        className={styles.cursor}
                      >
                        <img src={duckfoot} className={styles.duckfoot} />{" "}
                        {value.like}
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          Onlike(value._id);
                        }}
                        className={styles.cursor}
                      >
                        <img src={duckfootDark} className={styles.duckfoot} />{" "}
                        {value.like}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          : searchdata?.map((value) => {
              return (
                <div className={styles.contentbox} key={value._id}>
                  <img
                    src="https://forfiles.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-09-09+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.41.18.png"
                    className={styles.bicimg}
                  ></img>
                  <div className={styles.thirdtext}>
                    <div>{value.title}</div>
                    {value.isLiked ? (
                      <div
                        onClick={() => {
                          Onlike(value._id);
                        }}
                        className={styles.cursor}
                      >
                        <img src={duckfoot} className={styles.duckfoot} />{" "}
                        {value.like}
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          Onlike(value._id);
                        }}
                        className={styles.cursor}
                      >
                        <img src={duckfootDark} className={styles.duckfoot} />{" "}
                        {value.like}
                      </div>
                    )}
                    {/* <div
                      onClick={() => {
                        Onlike(value._id);
                      }}
                      className={styles.cursor}
                    >
                      ♥︎ {value.like}
                    </div> */}
                  </div>
                </div>
              );
            })}
        {/* {showRecommend ? (
          searchdata?.map((value) => {
            return (
              <div className={styles.contentbox} key={value._id}>
                <div className={styles.bicimg}></div>
                <div className={styles.thirdtext}>
                  <div>{value.title}</div>
                  <div
                    onClick={() => {
                      Onlike(value._id);
                    }}
                    className={styles.cursor}
                  >
                    ❤️ {value.like}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.notexist}>정보가 없습니다.</div>
        )} */}
        <div className={styles.bottom} ref={obsRef}>
          바닥
        </div>
      </div>
    </div>
  );
};

export default ThirdBox;
