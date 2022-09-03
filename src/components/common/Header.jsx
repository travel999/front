import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { removeCookie } from "../../res/cookie";

const Header = () => {
  const navigate = useNavigate();

  const removeToken = async () => {
    removeCookie("jwtToken");
    alert("로그아웃이 완료되었습니다.");
    await navigate("/");
  };

  return (
    <HeaderBox>
      <HomBtn
        onClick={() => {
          navigate("/");
        }}
      >
        HOME
      </HomBtn>
      <Topcontent>
        <ContentBtn
          onClick={() => {
            navigate("/main");
          }}
        >
          MAIN
        </ContentBtn>
        <ContentBtn
          onClick={() => {
            navigate("/write");
          }}
        >
          WRITE
        </ContentBtn>
        <ContentBtn
          onClick={() => {
            navigate("/detail");
          }}
        >
          LIKE
        </ContentBtn>
        <ContentBtn
          onClick={() => {
            navigate("/myprofile");
          }}
        >
          PROFILE
        </ContentBtn>
      </Topcontent>
      {
        <LogOutBtn
          onClick={() => {
            removeToken();
          }}
        >
          LOGOUT
        </LogOutBtn>
      }
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  background-color: transparent;
  height: 8vh;
  display: flex;
  justify-content: space-between;
  background-color: #d8f3fc;
`;

const HomBtn = styled.div`
  margin: 18px 0px 0px 18px;
  cursor: pointer;
`;

const LogOutBtn = styled.div`
  margin: 18px 18px 0px 0px;
  cursor: pointer;
`;

const Topcontent = styled.div`
  display: flex;
  margin-left: 700px;
  div {
    margin-left: 30px;
    margin-top: 18px;
  }
`;

const ContentBtn = styled.div`
  cursor: pointer;
`;
export default Header;
