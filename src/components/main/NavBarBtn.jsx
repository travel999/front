import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavBarBtn = ({ name }) => {
  const navigate = useNavigate();

  return (
    <>
      {name == "등록" ? (
        <NavBtn
          onClick={() => {
            navigate("/write");
          }}
        >
          등록
        </NavBtn>
      ) : null}
      {name == "좋아요" ? (
        <NavBtn
          onClick={() => {
            navigate("/detail/mylike");
          }}
        >
          좋아요
        </NavBtn>
      ) : null}
    </>
  );
};

const NavBtn = styled.div`
  margin-top: 8vh;
  margin-left: 30px;
  cursor: pointer;
`;

export default NavBarBtn;
