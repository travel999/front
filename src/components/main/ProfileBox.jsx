import React from "react";
import { useSelector } from "react-redux";
import PostBtn from "./PostBtn";
import QuestionBtn from "./QuestionBtn";
import styles from "../module.css/Main.module.css";
import duckprofile from "../../res/img/duck/duckprofile.png";

const ProfileBox = () => {
  const postnumber = useSelector((state) => state.main.MyPostCards);

  const mypostNum = postnumber?.data1?.length;
  const likepostNum = postnumber?.data2?.length;
  const getnickname = localStorage.getItem("nickname");
  const frofileImg = localStorage.getItem("image");

  return (
    <div style={{ zIndex: "2" }}>
      <div className={`${styles.profile}`}>
        {frofileImg === undefined ||
        frofileImg === "" ||
        frofileImg === null ? (
          <img
            src={duckprofile}
            alt="profileImg"
            className={styles.profileimg}
          />
        ) : (
          <img
            src={frofileImg}
            className={styles.profileimg}
            alt="profileImg"
          />
        )}
        {getnickname ? (
          <div className={styles.profilename}>
            <b style={{ fontWeight: "700" }}>{getnickname}</b>의 여행
          </div>
        ) : (
          <div className={styles.profilename}>
            <b style={{ fontWeight: "700" }}>우리가치</b>의 여행
          </div>
        )}
        <div className={styles.profiltext}>
          <div className={styles.profilefont}>여행 일정</div>
          <div className={styles.profilefont}>좋아요한 일정</div>
        </div>
        <div className={styles.profiltext}>
          <div className={styles.profileNum}>{mypostNum ? mypostNum : 0}</div>
          <div className={styles.profileNum}>
            {likepostNum ? likepostNum : 0}
          </div>
        </div>
      </div>
      <div className={styles.PQBtn}>
        <PostBtn />
        <QuestionBtn />
      </div>
    </div>
  );
};

export default ProfileBox;
