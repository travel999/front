import React from "react";
import styled from "styled-components";

const Btn = (props) => {
  return (
    <StyledGlobalButton
      marginLeft={props.marginLeft}
      backgroundColor={props.backgroundColor}
      onClick={props.onClick}
      color={props.color}
      value={props.value}
      width={props.width}
      height={props.height}
    >
      {props.children}
    </StyledGlobalButton>
  );
};

const StyledGlobalButton = styled.button`
  width: ${(props) => props.width || "100px"};
  height: ${(props) => props.height};
  border: none;
  color: ${(props) => props.color || "#333"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
  font-size: 1.2rem;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  cursor: pointer;
  margin-left: ${(props) => props.marginLeft};
`;

export default Btn;
