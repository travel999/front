import React from "react";
import { useSelector } from "react-redux";
import PostBtn from "./PostBtn";
import styles from "./Main.module.css";
import duckprofile from "../../res/img/duck/duckprofile.png";
import QuestionBtn from "./QuestionBtn";

const ProfileBox = () => {
  const postnumber = useSelector((state) => state.main.MyPostCards);

  const mypostNum = postnumber?.data1?.length;
  const likepostNum = postnumber?.data2?.length;
  const getnickname = localStorage.getItem("nickname");
  const frofileImg = localStorage.getItem("image");

  return (
    <div style={{ zIndex: "2" }}>
      <div className={`${styles.profile}`}>
        {frofileImg === undefined || frofileImg === "" ? (
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
            <b style={{ fontWeight: "600" }}>{getnickname}</b>의 여행
          </div>
        ) : (
          <div className={styles.profilename}>
            <b style={{ fontWeight: "600" }}>우리가치</b>의 여행
          </div>
        )}
        <div className={styles.profiltext}>
          <div className={styles.profilefont}>여행 일정</div>
          <div className={styles.profilefont}>찜한 일정</div>
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
