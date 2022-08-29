import React from "react";
import styled from "styled-components";
import LeftNavBar from "./maincomponents/LeftNavBar";
import MyLikeCard from "./maincomponents/MyLikeCard";
import MyPostCard from "./maincomponents/MyPostCard";
import RecommendCard from "./maincomponents/RecommendCard";

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
