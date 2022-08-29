import React from "react";
import styled from "styled-components";
import NavBarBtn from "./NavBarBtn";
import ProfileImg from "../elements/ProfileImg";

const LeftNavBar = () => {
  return (
    <NavBarBox>
      <ProfileImg main={true} />
      <FourBtnBox>
        <NavBarBtn name={"등록"} />
        <NavBarBtn name={"좋아요"} />
      </FourBtnBox>
    </NavBarBox>
  );
};

const NavBarBox = styled.div`
  background-color: yellow;
  position: fixed;
  width: 140px;
  height: 100vh;
`;

const FourBtnBox = styled.div`
  margin-top: 25vh;
`;

export default LeftNavBar;
