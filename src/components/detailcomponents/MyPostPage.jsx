import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostCards from "./PostCards";

const MyPostPage = () => {
  const navigate = useNavigate();

  return (
    <PostBox>
      <MyPostBtn>내가 등록한 일정</MyPostBtn>
      <MyLikeBtn
        onClick={() => {
          navigate("/detail/mylike");
        }}
      >
        내가 좋아요한 일정
      </MyLikeBtn>
      <MyPostBox>
        <PostCards />
        <PostCards />
        <PostCards />
        <PostCards />
        <PostCards />
      </MyPostBox>
    </PostBox>
  );
};

const PostBox = styled.div`
  margin: 30px;
`;

const MyPostBtn = styled.button`
  background-color: #c97b7b;
`;

const MyLikeBtn = styled.button``;

const MyPostBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default MyPostPage;
