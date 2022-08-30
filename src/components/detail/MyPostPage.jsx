import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostCards from "./PostCards";

const MyPostPage = () => {
  const navigate = useNavigate();

  return (
    <PostBox>
      <TextBox>
        <div>
          <MyPostBtn>내가 등록한 일정</MyPostBtn>
          <MyLikeBtn
            onClick={() => {
              navigate("/detail/mylike");
            }}
          >
            내가 좋아요한 일정
          </MyLikeBtn>
        </div>
        <div
          onClick={() => {
            navigate("/main");
          }}
        >
          뒤로가기
        </div>
      </TextBox>
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

const TextBox = styled.div`
  display: flex;
`;

const PostBox = styled.div`
  width: 85vw;
  margin: 20px auto;
`;

const MyPostBtn = styled.button`
  background-color: #c97b7b;
  padding: 5px;
  border-radius: 5px;
`;

const MyLikeBtn = styled.button`
  padding: 5px;
  border-radius: 5px;
`;

const MyPostBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default MyPostPage;
