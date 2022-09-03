import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Main.module.css";
import SearchBar from "./SearchBar";

const ThirdBox = ({ obsRef, input_ref, searchPage, setSearchPage }) => {
  const searchdata = useSelector((state) => state.main.otherPeopleCards.data);
  const recommendData = useSelector((state) => state.main.MyPostCards.data3);

  const [showRecommend, setShowrecomm] = useState(true);

  return (
    <div>
      <div className={styles.bicbox}>
        <div className={styles.toptext}>다른사람의 일정</div>
        <SearchBar
          input_ref={input_ref}
          searchPage={searchPage}
          setShowrecomm={setShowrecomm}
          setSearchPage={setSearchPage}
        />
        {showRecommend && recommendData?.length
          ? recommendData?.map((value) => {
              return (
                <div className={styles.contentbox} key={value._id}>
                  <div className={styles.bicimg}></div>
                  <div className={styles.thirdtext}>
                    <div>{value.title}</div>
                    <div className={styles.day}>
                      {value?.day.length - 1}박 {value?.day.length}일
                    </div>
                    <div>❤️ {value.like}</div>
                  </div>
                </div>
              );
            })
          : null}
        {showRecommend || searchdata?.length ? (
          searchdata?.map((value) => {
            return (
              <div className={styles.contentbox} key={value._id}>
                <div className={styles.bicimg}></div>
                <div className={styles.thirdtext}>
                  <div>{value.title}</div>
                  <div className={styles.day}>
                    {value?.day.length - 1}박 {value?.day.length}일
                  </div>
                  <div>❤️ {value.like}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.notexist}>정보가 없습니다.</div>
        )}
        <div className={styles.bottom} ref={obsRef}>
          바닥
        </div>
      </div>
    </div>
  );
};

export default ThirdBox;
