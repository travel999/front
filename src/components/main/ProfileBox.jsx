import React from "react";
import styles from "./ProfileBox.module.css";
import PostBtn from "./PostBtn";

const ProfileBox = () => {
  return (
    <div>
      <div className={`${styles.profile}`}>
        <div>프로필 박스</div>
      </div>
      <PostBtn />
    </div>
  );
};

export default ProfileBox;
