import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostCards from "../detailcomponents/PostCards";

const MyLikeCard = () => {
  const navigate = useNavigate();

  return (
    <>
      <MyLikeBox>
        내가 좋아요 누른 카드들
        <PlusBtn
          onClick={() => {
            navigate("/detail/mylike");
          }}
        >
          더보기+
        </PlusBtn>
        <LikeBox>
          <PostCards />
        </LikeBox>
      </MyLikeBox>
    </>
  );
};

const MyLikeBox = styled.div`
  background-color: lightgreen;
  height: 25vh;
`;

const PlusBtn = styled.span`
  margin-left: 10px;
  cursor: pointer;
`;

const LikeBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
`;

export default MyLikeCard;
