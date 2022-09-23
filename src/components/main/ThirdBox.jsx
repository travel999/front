import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toLike } from "../../redux/modules/MainSlice";
import styles from "./Main.module.css";
import SearchBar from "./SearchBar";
import duckfoot from "../../res/img/duck/duckfoot-4.png";
import duckfootDark from "../../res/img/duck/duckfoot-3.png";
import duckfootDark2 from "../../res/img/duck/duckfoot-2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { RandomPic } from "./RandomPicture";

const ThirdBox = ({
  obsRef,
  input_ref,
  searchPage,
  setSearchPage,
  load,
  beforeSearched,
  setBeforeSearched,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchdata = useSelector((state) => state.main?.otherPeopleCards);
  const recommendData = useSelector((state) => state.main.MyPostCards?.data3);
  const searched = useSelector((state) => state.main.searched); // true false

  const [showRecommend, setShowrecommend] = useState(true);
  const topRef = useRef(null);

  const Onlike = (value) => {
    dispatch(toLike(value));
  };

  const onGoDetailPage = (postId) => {
    navigate(`/schedulDetail/${postId}`);
  };

  return (
    <div className={styles.bicbox}>
      <SearchBar
        input_ref={input_ref}
        searchPage={searchPage}
        setShowrecommend={setShowrecommend}
        setSearchPage={setSearchPage}
        beforeSearched={beforeSearched}
        setBeforeSearched={setBeforeSearched}
        topRef={topRef}
      />
      <div className={styles.onlyscroll}>
        <div ref={topRef} />
        {showRecommend
          ? recommendData?.length &&
            recommendData?.map((value, idx) => {
              return (
                <div className={styles.contentbox} key={"TB" + value._id}>
                  <img
                    src={RandomPic(idx)}
                    className={`${styles.bicimg} ${styles.refresh}`}
                    alt="img"
                    onClick={() => {
                      onGoDetailPage(value._id);
                    }}
                  ></img>
                  <div className={styles.thirdtext}>
                    <div className={`${styles.refresh} ${styles.toptitle}`}>
                      <div
                        onClick={() => {
                          onGoDetailPage(value._id);
                        }}
                      >
                        {value.title}
                      </div>
                      {value.isLiked ? (
                        <div
                          onClick={() => {
                            Onlike(value._id);
                          }}
                          className={`${styles.cursor} ${styles.duckfootpart}`}
                        >
                          <img
                            src={duckfoot}
                            className={styles.duckfoot2}
                            alt="duckfoot"
                          />{" "}
                          {value.like}
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            Onlike(value._id);
                          }}
                          className={`${styles.cursor} ${styles.duckfootpart}`}
                        >
                          <img
                            src={duckfootDark}
                            className={styles.darkfoot}
                            alt="duckfoot-2"
                          />{" "}
                          {value.like}
                        </div>
                      )}
                    </div>
                    {/* <div
                      className={`${styles.traveldate} ${styles.traveldate2}`}
                    >
                      {value.date[0].slice(5) + " ~ " + value.date[1].slice(5)}
                    </div> */}
                    <div>
                      {value?.day1?.pin ? (
                        <div
                          style={{
                            display: "flex",
                            margin: "7px 0px 5px 0px",
                          }}
                        >
                          <img
                            src={duckfootDark2}
                            className={styles.darkduckfoot}
                            alt="duckfoot"
                          />
                          <div className={styles.travelplace}>
                            {value.day1.pin[0].title}
                          </div>
                        </div>
                      ) : null}
                      {value?.day2?.pin ? (
                        <div style={{ display: "flex" }}>
                          <img
                            src={duckfootDark2}
                            className={styles.darkduckfoot}
                            alt="duckfoot"
                          />
                          <div className={styles.travelplace}>
                            {value.day2.pin[0].title}
                          </div>
                        </div>
                      ) : null}
                      {value?.day3?.pin ? (
                        <div style={{ display: "flex", marginTop: "5px" }}>
                          <img
                            src={duckfootDark2}
                            className={styles.darkduckfoot}
                            alt="duckfoot"
                          />
                          <div className={styles.travelplace}>
                            {value.day3.pin[0].title}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })
          : searchdata?.length &&
            searchdata?.map((value, idx) => {
              return (
                <div className={styles.contentbox} key={value._id}>
                  <img
                    src={RandomPic(idx)}
                    className={`${styles.bicimg} ${styles.refresh}`}
                    alt="img"
                    onClick={() => {
                      onGoDetailPage(value._id);
                    }}
                  ></img>
                  <div className={styles.thirdtext}>
                    <div className={`${styles.refresh} ${styles.toptitle}`}>
                      <div
                        onClick={() => {
                          onGoDetailPage(value._id);
                        }}
                      >
                        {value.title}
                      </div>
                      {value.isLiked ? (
                        <div
                          onClick={() => {
                            Onlike(value._id);
                          }}
                          className={`${styles.cursor} ${styles.duckfootpart}`}
                        >
                          <img
                            src={duckfoot}
                            className={styles.duckfoot2}
                            alt="duckfoot"
                          />{" "}
                          {value.like}
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            Onlike(value._id);
                          }}
                          className={`${styles.cursor} ${styles.duckfootpart}`}
                        >
                          <img
                            src={duckfootDark}
                            className={styles.darkfoot}
                            alt="duckfoot-2"
                          />{" "}
                          {value.like}
                        </div>
                      )}
                    </div>
                    {/* <div
                      className={`${styles.traveldate} ${styles.traveldate2}`}
                    >
                      {value.date[0] + "~" + value.date[1]}
                    </div> */}
                    <div>
                      {value?.day1?.pin ? (
                        <div style={{ display: "flex", margin: "5px 0px" }}>
                          <img
                            src={duckfootDark2}
                            className={styles.darkduckfoot}
                            alt="duckfoot"
                          />
                          <div className={styles.travelplace}>
                            {value.day1.pin[0].title}
                          </div>
                        </div>
                      ) : null}
                      {value?.day2?.pin ? (
                        <div style={{ display: "flex" }}>
                          <img
                            src={duckfootDark2}
                            className={styles.darkduckfoot}
                            alt="duckfoot"
                          />
                          <div className={styles.travelplace}>
                            {value.day2.pin[0].title}
                          </div>
                        </div>
                      ) : null}
                      {value?.day3?.pin ? (
                        <div style={{ display: "flex" }}>
                          <img
                            src={duckfootDark2}
                            className={styles.darkduckfoot}
                            alt="duckfoot"
                          />
                          <div className={styles.travelplace}>
                            {value.day3.pin[0].title}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
        {load ? (
          <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
        ) : (
          <div className={styles.notexist}>자료가 존재하지 않습니다.</div>
        )}
        <div className={styles.bottom} ref={obsRef}>
          바닥
        </div>
      </div>
    </div>
  );
};

export default ThirdBox;
