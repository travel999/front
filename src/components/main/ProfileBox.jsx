import React from "react";
import styles from "./Main.module.css";
import PostBtn from "./PostBtn";
import { useSelector } from "react-redux";

const ProfileBox = () => {
  const postnumber = useSelector((state) => state.main.MyPostCards);
  const mypostNum = postnumber?.data1?.length;
  const likepostNum = postnumber?.data2?.length;

  return (
    <div>
      <div className={`${styles?.profile}`}>
        <div className={styles?.profileimg}></div>
        <div className={styles.profiltext}>
          <div className={styles.profileNum}>{mypostNum}</div>
          <div className={styles.profileNum}>{likepostNum}</div>
        </div>
        <div className={styles.profiltext}>
          <div className={styles.profilefont}>내 일정</div>
          <div className={styles.profilefont}>좋아요</div>
        </div>
      </div>
      <PostBtn />
    </div>
  );
};

export default ProfileBox;
