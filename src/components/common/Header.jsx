import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCookie, removeCookie } from "../../res/cookie";

const Header = () => {
  const navigate = useNavigate();
  const tokenValue = getCookie("jwtToken");

  if (!tokenValue) navigate("/");

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
        홈버튼
      </HomBtn>
      {tokenValue ? (
        <LogOutBtn
          onClick={() => {
            removeToken();
          }}
        >
          로그아웃
        </LogOutBtn>
      ) : (
        <div>로그인을 해주세요</div>
      )}
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  background-color: transparent;
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
