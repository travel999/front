import React from "react";
import styled from "styled-components";
import LeftNavBar from "./main/LeftNavBar";
import MyLike from "./main/MyLike";
import MyPost from "./main/MyPost";
import Shared from "./main/Shared";

const Main = () => {
  return (
    <>
      <LeftNavBar />
      <MainContentBox>
        <MyPost />
        <MyLike />
        <Shared />
      </MainContentBox>
    </>
  );
};

const MainContentBox = styled.div`
  margin-left: 140px;
`;

export default Main;
