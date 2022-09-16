import React from "react";
import styles from "./Main.module.css";
import PostBtn from "./PostBtn";
import { useSelector } from "react-redux";

const ProfileBox = () => {
  const postnumber = useSelector((state) => state.main.MyPostCards);
  const mypostNum = postnumber?.data1?.length;
  const likepostNum = postnumber?.data2?.length;

  return (
    <div style={{ zIndex: "2" }}>
      <div className={`${styles.profile}`}>
        <img
          src="https://forfiles.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-09-03+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+12.56.41.png"
          className={styles.profileimg}
          alt="img"
        />
        <div className={styles.profilename}>
          <b style={{ fontWeight: "600" }}>오리가치</b>의 여행
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
