import React from "react";
import {
  Profile,
  Inputwrap,
  Input,
} from "./ScheduleWrite/JoinStyle"


const Join = () => {
  return (
    <div>
      <Profile>
        <img alt=""></img>
        <label>프로필 이미지 업로드</label><br />        
      </Profile>
      <Inputwrap>
        Nickname<Input></Input>
        Email<Input></Input>
        Password<Input></Input>
        Confirm<Input></Input>
        <button>Join</button>
      </Inputwrap>
    </div>

  );
};

export default Join;