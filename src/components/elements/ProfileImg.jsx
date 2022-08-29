import React from "react";
import styled from "styled-components";

const ProfileImg = (prop) => {
  return <ProfileCircle main={prop.main}></ProfileCircle>;
};

const ProfileCircle = styled.div`
  background-color: ${(prop) => (prop.main ? "lightcoral" : "black")};
  height: ${(prop) => (prop.main ? "10%" : "0vh")};
  width: ${(prop) => (prop.main ? "60%" : "0vw")};
  margin: ${(prop) => (prop.main ? "19%" : "0%")};
  border-radius: ${(prop) => (prop.main ? "50%" : "0px")};
`;

export default ProfileImg;
