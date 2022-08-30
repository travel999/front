import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostCards from "../detail/PostCards";

const MyLike = () => {
  const navigate = useNavigate();

  return (
    <>
      <MyLikeBox>
        좋아요한 일정
        <PlusBtn
          onClick={() => {
            navigate("/detail/mylike");
          }}
        >
          더보기+
        </PlusBtn>
        <LikeBox>
          <PostCards />
          <PostCards />
          <PostCards />
          <PostCards />
        </LikeBox>
      </MyLikeBox>
    </>
  );
};

const MyLikeBox = styled.div`
  margin: 10px 0px 0px 10px;
`;

const PlusBtn = styled.span`
  margin-left: 10px;
  cursor: pointer;
`;

const LikeBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default MyLike;
