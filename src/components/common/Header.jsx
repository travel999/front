import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderBox>
      <HomBtn
        onClick={() => {
          navigate("/");
        }}
      >
        홈버튼
      </HomBtn>
      <LogOutBtn>로그아웃</LogOutBtn>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  background-color: lightblue;
  height: 8vh;
  display: flex;
  justify-content: space-between;
`;

const HomBtn = styled.div`
  margin: 18px 0px 0px 18px;
  cursor: pointer;
`;

const LogOutBtn = styled.div`
  margin: 18px 18px 0px 0px;
  cursor: pointer;
`;

export default Header;
