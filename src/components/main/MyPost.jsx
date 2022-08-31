import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCards } from "../../redux/modules/MainSlice";
import PostCards from "../detail/PostCards";

const MyPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = true;

  // 내가 등록한 게시글 가져오기 토큰확인은 여기서만 함.
  useEffect(() => {
    if (token == undefined) {
      navigate("/");
    } else {
      dispatch(getCards());
    }
  }, []);

  return (
    <>
      <MyPostBox>
        내 일정
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
          <ToPostCard
            onClick={() => {
              navigate("/write");
            }}
          >
            추가하기카드<div>+</div>
          </ToPostCard>
        </PostBox>
      </MyPostBox>
    </>
  );
};

const MyPostBox = styled.div`
  width: 90%;
  margin: 20px auto;
`;

const PlusBtn = styled.span`
  margin-left: 10px;
  cursor: pointer;
`;

const PostBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ToPostCard = styled.div`
  width: 17vw;
  height: 14vh;
  background-color: lightpink;
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  margin: 20px auto 20px auto;
  cursor: pointer;
`;

export default MyPost;
