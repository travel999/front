import React from "react";
import PostBtn from "./PostBtn";
import styles from "./ProfileBox.module.css";

const ProfileBox = () => {
  return (
    <div>
      <div className={styles.profile}>
        <div>프로필 박스</div>
      </div>
      <PostBtn />
    </div>
  );
};

export default ProfileBox;
