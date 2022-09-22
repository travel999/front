import React, { useEffect } from "react";
import styles from "./Main.module.css";
import PostBtn from "./PostBtn";
import { useSelector } from "react-redux";
import duckprofile from "../../res/img/duck/duckprofile.png";

const ProfileBox = () => {
  const postnumber = useSelector((state) => state.main.MyPostCards);
  const mypostNum = postnumber?.data1?.length;
  const likepostNum = postnumber?.data2?.length;

  const getnickname = localStorage.getItem("nickname");
  const frofileImg = localStorage.getItem("image");

  let nickname = "우리가치";

  useEffect(() => {
    if (getnickname !== undefined) {
      nickname = getnickname;
    }
  }, []);

  return (
    <div style={{ zIndex: "2" }}>
      <div className={`${styles.profile}`}>
        {frofileImg === undefined ? (
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
        <div className={styles.profilename}>
          <b style={{ fontWeight: "600" }}>{nickname}</b>의 여행
        </div>
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
      <PostBtn />
    </div>
  );
};

export default ProfileBox;
