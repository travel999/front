import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostCards from "./PostCards";

const MyLikePage = () => {
  const navigate = useNavigate();

  return (
    <LikeBox>
      <TextBox>
        <div>
          <MyPostBtn
            onClick={() => {
              navigate("/detail/mypost");
            }}
          >
            내가 등록한 일정
          </MyPostBtn>
          <MyLikeBtn>내가 좋아요한 일정</MyLikeBtn>
        </div>
        <div
          onClick={() => {
            navigate("/main");
          }}
        >
          뒤로가기
        </div>
      </TextBox>
      <MyLikeBox>
        <PostCards />
        <PostCards />
        <PostCards />
        <PostCards />
        <PostCards />
        <PostCards />
      </MyLikeBox>
    </LikeBox>
  );
};

const TextBox = styled.div`
  display: flex;
`;

const LikeBox = styled.div`
  width: 85vw;
  margin: 20px auto;
`;

const MyLikeBtn = styled.button`
  background-color: #c97b7b;
  padding: 5px;
  border-radius: 5px;
`;

const MyPostBtn = styled.button`
  padding: 5px;
  border-radius: 5px;
`;

const MyLikeBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default MyLikePage;
