import React from "react";

import duck from "../res/img/duck/noDateDuck.png";
import styled from "styled-components";

const NotFound = () => {
  return (
    <BackGround>
      <DuckImg src={duck} />
      <Text>페이지를 찾을 수 없습니다.</Text>
    </BackGround>
  );
};

const BackGround = styled.div`
  background-color: #f2f7ff;
  height: 92.9vh;
  text-align: center;
`;

const Text = styled.div`
  font-size: 1.5em;
  padding: 50px 0px 20px 0px;
`;

const DuckImg = styled.img`
  width: 25%;
  padding-top: 50px;
`;

export default NotFound;
