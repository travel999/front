import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PostCards from "../detail/PostCards";

const Shared = () => {
  const [search, setSearch] = useState(false);
  const Search_ref = useRef();
  const dispatch = useDispatch();

  const tosearch = () => {
    dispatch();
  };

  return (
    <>
      <RecommendBox>
        다양한 일정들
        <ShowSearchBtn
          onClick={() => {
            setSearch(!search);
          }}
        >
          🔍
        </ShowSearchBtn>
        {search ? (
          <>
            <input ref={Search_ref} />
            <SearchBtn>검색</SearchBtn>
          </>
        ) : null}
      </RecommendBox>
      <PostCardBox>
        <PostCards />
        <PostCards />
        <PostCards />
        <PostCards />
      </PostCardBox>
    </>
  );
};

const RecommendBox = styled.div`
  display: flex;
  margin: 10px 0px 0px 10px;
`;

const ShowSearchBtn = styled.div`
  margin: 0px 10px;
  cursor: pointer;
`;

const SearchBtn = styled.button`
  cursor: pointer;
  margin-left: 5px;
`;

const PostCardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
`;

export default Shared;
