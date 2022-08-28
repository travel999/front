import React from "react";
import styled from "styled-components";

const NavBarBtn = ({ name }) => {
  return <NavBtn>{name}</NavBtn>;
};

const NavBtn = styled.div`
  background-color: #a1a1db;
  margin-top: 7vh;
  margin-left: 1vw;
`;

export default NavBarBtn;
