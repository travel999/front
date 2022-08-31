import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostCards from "../detail/PostCards";

const MyLike = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 좋아요하는 게시글 불러오기
  // useEffect(() => {
  //   dispatch();
  // }, []);

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
  margin: 20px auto;
  width: 90%;
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
