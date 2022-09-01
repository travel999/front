import React from "react";
import styles from "./ProfileBox.module.css";
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
        <div>여행일정: {mypostNum}</div>
        <div>좋아하는 일정: {likepostNum}</div>
      </div>
      <PostBtn />
    </div>
  );
};

export default ProfileBox;
