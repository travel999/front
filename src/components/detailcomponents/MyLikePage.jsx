import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostCards from "./PostCards";

const MyLikePage = () => {
  const navigate = useNavigate();

  return (
    <LikeBox>
      <MyPostBtn
        onClick={() => {
          navigate("/detail/mypost");
        }}
      >
        내가 등록한 일정
      </MyPostBtn>
      <MyLikeBtn>내가 좋아요한 일정</MyLikeBtn>
      <MyLikeBox>
        <PostCards />
        <PostCards />
        <PostCards />
      </MyLikeBox>
    </LikeBox>
  );
};

const LikeBox = styled.div`
  margin: 30px;
`;

const MyLikeBtn = styled.button`
  background-color: #c97b7b;
`;

const MyPostBtn = styled.button``;

const MyLikeBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default MyLikePage;
