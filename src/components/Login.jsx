import React from "react";
import {
  TitleWrap,
  Title,
} from "./StyledModule/LoginStyle"

const Login = () => {
  return (
    <TitleWrap>
      <Title>Service Name</Title>
      <div>
        Email:
        <input name="email"></input>
        <br/>
        Password:
        <input name="password" type="password"></input>
      </div>
    <button>LogIn</button>
    </TitleWrap>
  );
};

export default Login;