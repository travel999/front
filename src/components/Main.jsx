import React from "react";
import styled from "styled-components";
import LeftNavBar from "./main/LeftNavBar";
import MyLikeCard from "./main/MyLikeCard";
import MyPostCard from "./main/MyPostCard";
import RecommendCard from "./main/RecommendCard";

const Main = () => {
  return (
    <>
      <LeftNavBar />
      <MainContentBox>
        <MyPostCard />
        <MyLikeCard />
        <RecommendCard />
      </MainContentBox>
    </>
  );
};

const MainContentBox = styled.div`
  margin-left: 140px;
`;

export default Main;
