import React from "react";
import styled from "styled-components";

const PostCards = () => {
  return <MyPostBox>포스트 카드박스</MyPostBox>;
};

const MyPostBox = styled.div`
  width: 17vw;
  height: 14vh;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  margin: 20px auto 20px auto;
`;

export default PostCards;
