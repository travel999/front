import React from "react";
import { useNavigate } from "react-router-dom";
import background from "../../res/img/background.png"
import { Img, Title, Des, Btn1, Btn2, Btn3 } from "./StartStyle";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Title>Service Name</Title>
      <Des>
        어쩌고에 오신걸 환영해요!
        <br />
        혼자 말고, 친구와 함께
        <br />
        즐거운 여행 계획을 세워보세요!
      </Des>
      <div>
        <Btn1
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Btn1>
        <Btn2
          onClick={() => {
            navigate("/join");
          }}
        >
          Join
        </Btn2>
        <Btn3>Social Login</Btn3>
      </div>
      <Img>
        <img src={background} alt="배경"></img>
      </Img>
    </div>
  );
};

export default Start;
