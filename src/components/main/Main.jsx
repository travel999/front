import React, { useEffect } from "react";
import styles from "./Main.module.css";
import FirstBox from "./FirstBox";
import SecondBox from "./SecondBox";
import ThirdBox from "./ThirdBox";
import ProfileBox from "./ProfileBox";
import { useDispatch, useSelector } from "react-redux";
import { getCards, getgood } from "../../redux/modules/MainSlice";

const Main = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.main.MyPostCards);
  console.log(state);

  useEffect(() => {
    dispatch(getCards());
    dispatch(getgood());
  }, []);

  return (
    <>
      <div className={styles.mainbox}>
        <ProfileBox />
        <FirstBox />
        <SecondBox />
        <ThirdBox />
      </div>
    </>
  );
};

export default Main;
