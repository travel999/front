import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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
            navigate("/profile");
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
  padding: 2vh 2vw;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  border-bottom: 1px solid lightgray;
`;

const HomBtn = styled.div`
  cursor: pointer;
  margin-left: 10px;
  margin-top: 3px;
  :hover {
    border-bottom: 1px solid black;
    margin-bottom: -1px;
  }
`;

const LogOutBtn = styled.div`
  cursor: pointer;
  margin-right: 10px;
  margin-top: 3px;
  :hover {
    border-bottom: 1px solid black;
    margin-bottom: -1px;
  }
`;

const Topcontent = styled.div`
  display: flex;
  margin-left: 35vw;
  div {
    margin-left: 40px;
    margin-top: 3px;
    :hover {
      border-bottom: 1px solid black;
      margin-bottom: -1px;
    }
  }
`;

const ContentBtn = styled.div`
  cursor: pointer;
`;
export default Header;
