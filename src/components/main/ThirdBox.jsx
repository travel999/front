import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Main.module.css";
import SearchBar from "./SearchBar";

const ThirdBox = ({ page, setPage, obsRef }) => {
  const dispatch = useDispatch();
  const searchdata = useSelector((state) => state.main.otherPeopleCards.data);
  const recommendData = useSelector((state) => state.main.MyPostCards.data3);

  const [showRecommend, setShowrecomm] = useState(true);

  const input_ref = useRef(null); //검색ref

  return (
    <div>
      <div className={styles.bicbox}>
        <div className={styles.toptext}>다른사람의 일정</div>
        <SearchBar input_ref={input_ref} setShowrecomm={setShowrecomm} />
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
        {showRecommend && searchdata?.length ? (
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
          <div className={styles.notexist}>정보가 존재하지 않습니다.</div>
        )}
        <div ref={obsRef}>바닥</div>
      </div>
    </div>
  );
};

export default ThirdBox;
