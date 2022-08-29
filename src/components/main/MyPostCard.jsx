import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { _GetCards } from "../../redux/modules/MainSlice";
import PostCards from "../detail/PostCards";

const MyPostCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(_GetCards());
  }, []);

  return (
    <>
      <MyPostBox>
        포스트들
        <PlusBtn
          onClick={() => {
            navigate("/detail/mypost");
          }}
        >
          더보기+
        </PlusBtn>
        <PostBox>
          <PostCards />
          <PostCards />
          <PostCards />
          <ToPostCard>추가하기카드</ToPostCard>
        </PostBox>
      </MyPostBox>
    </>
  );
};

const MyPostBox = styled.div`
  background-color: lightcyan;
  height: 25vh;
`;

const PlusBtn = styled.span`
  margin-left: 10px;
  cursor: pointer;
`;

const PostBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
`;

const ToPostCard = styled.div`
  width: 250px;
  height: 100px;
  background-color: lightpink;
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  margin: 20px 20px 20px 0px;
`;

export default MyPostCard;
