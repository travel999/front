import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../res/cookie";
import styles from "./Main.module.css";
import FirstBox from "./FirstBox";
import SecondBox from "./SecondBox";
import ThirdBox from "./ThirdBox";
import ProfileBox from "./ProfileBox";
import { getCards } from "../../redux/modules/MainSlice";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenValue = getCookie("jwtToken");

  useEffect(() => {
    if (!tokenValue) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    dispatch(getCards());
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
