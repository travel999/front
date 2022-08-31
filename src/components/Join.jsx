import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addJoin, doubleCheckEmail, doubleCheckNickName } from "../redux/modules/JoinSlice";
import {
  Profile,
  Inputwrap,
  Input,
} from "./StyledModule/JoinStyle"


const Join = () => {
  const initialState = {
    email: "",
    nickName: "",
    passWord: "",
    confirm: "",
  };

  const inputRef = useRef();
  const navigate = useNavigate();

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkNickName, setCheckNickName] = useState(false)

  const [signUp, setSignUp] = useState(initialState);
  const [emailData, setEmailData] = useState("");
  const [nicknNameData, setNickNameData] = useState("")
  const [passData, setPassData] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [img, setImg] = useState([]);
  const [preImg, setPreImg] = useState([]);

  //유효성 확인 메세지
  const [emailMsg, setEmailMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [nickNameMsg, setNickNameMsg] = useState("")
  const [confirmMsg, setConfirmMsg] = useState("");

  // 정규식 리스트
  const idRule = /^[a-zA-Z0-9+\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{3}$/;
  const pwRule = /^[a-zA-Z0-9]{5,12}$/;
  const nickNameRule = /^[ㄱ-ㅎ가-힣ㅏ-ㅣa-zA-Z0-9]{1,10}$/;

  // ID 중복 확인
  const dispatch = useDispatch();
  useEffect(() => {
    if (checkEmail) {
      dispatch(doubleCheckEmail({ email: emailData, setEmailMsg }));
    }
  }, [checkEmail]);

  // 닉네임 중복 확인
  useEffect(() => {
    if (checkNickName) {
      dispatch(doubleCheckNickName({ nickName: nicknNameData, setNickNameMsg }));
    }
  }, [checkNickName]);

  // 유효성 검사
  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    // 아이디 유효성
    if (name === "email") {
      if (idRule.test(value) && value !== "") {
        setEmailData(value);
        setCheckEmail(true);
      } else if (!idRule.test(value)) {
        setEmailMsg("이메일 형식에 맞게 입력해주세요.");
      }
    }
    // 닉네임 유효성
    if (name === "nickName") {
      if (nickNameRule.test(value) && value !== "") {
        setNickNameData(value);
        setCheckNickName(true);
      } else if (!nickNameRule.test(value)) {
        setNickNameMsg("닉네임은 특수문자 제외 1~10 글자로 입력할 수 있습니다.");
      } else if (nickNameRule.test(value)) {
        setNickNameMsg("사용가능한 닉네임입니다.");
        setNickNameData(value);
      }
    }

    // 비밀번호 유효성
    else if (name === "passWord") {
      if (!pwRule.test(value) && value !== "") {
        setPwMsg("비밀번호는 5자 이상 ~ 12자 이하여야 합니다.");
      } else if (pwRule.test(value)) {
        setPwMsg("사용가능한 비밀번호 입니다.");
        setPassData(value);
      }

      //2차 비밀번호 작성 후 비밀번호 작성 시 유효성 체크 로직
      if (value !== "" && signUp.confirmPass !== value) {
        setConfirmMsg("비밀번호가 다릅니다.");
      } else if (signUp.confirmPass === value) {
        setConfirmMsg("비밀번호가 일치합니다.");
      }
    }
    // 비밀번호 확인 유효성
    else if (name === "confirmPass") {
      if (signUp.passWord !== "" && signUp.passWord !== value) {
        setConfirmMsg("비밀번호가 다릅니다.");
      } else if (signUp.passWord == value) {
        setConfirmMsg("비밀번호가 일치합니다");
        setConfirmPass(value);
      }
    }
    setSignUp({ ...signUp, [name]: value });
  };

  // 버튼 클릭시 빈칸 확인, 올바르게 입력시 값 전송
  const onClickJoin = (e) => {
    const data = {};
    data.email = emailData;
    data.nickName = nicknNameData;
    data.passWord = passData;
    data.confirm = confirmPass;
    console.log(data)

    if (
      emailData == "" ||
      nicknNameData === "" ||
      passData === "" ||
      confirmPass === ""
    ) {
      alert("내용을 확인해 주세요!");
    } else {
      dispatch(addJoin({ navigate, data }));
    } // dispatch에 값도 같이 넣어서 보내줘유
    dispatch(addJoin({ navigate, data }));
  }

  //이미지 체인지 핸들러
  const onLoadImg = (event) => {
    //현재 이미지 파일
    const imaData = event.target.files[0];
    setImg(imaData);
    //선택한 이미지 파일의 url
    const imageUrl = URL.createObjectURL(imaData);
    setPreImg(imageUrl);
  };


  return (
    <Profile>
      <Inputwrap>
        <div>
          <div>Nickname</div>
        <Input
            onChange={onChangeHandler}
            type="text"
            id="nickName"
            name="nickName"
            maxLength="10"
          />
          <span>{nickNameMsg}</span>
          <div>Email</div>
          <Input
            ref={inputRef}
            onChange={onChangeHandler}
            type="mail"
            id="email"
            name="email"
            required
          />
          <span>{emailMsg}</span>
        </div>
        <div >
          <div>Password</div>
          <Input
            onChange={onChangeHandler}
            type="password"
            name="passWord"
            id="passWord"
            minLength="5"
            maxLength="12"
            required
          />
          <span>{pwMsg}</span>
        </div>

        <div>
          <div>Confirm</div>
          <Input
            onChange={onChangeHandler}
            type="password"
            name="confirmPass"
            minLength="5"
            maxLength="12"
            required
          />
          <span>{confirmMsg}</span>
        </div>
      </Inputwrap>
      <div>
          <div>프로필</div>
          <div>
            {/* {!preImgFile[0] ? (
      <img src={base_img} alt="이미지 미리보기" />
    ) : (
      <img src={preImgFile} alt="이미지 미리보기" />
    )} */}
            <label htmlFor="userimg">사진 업로드</label>
          </div>
          <input
            onChange={onLoadImg}
            type="file"
            accept="image/*"
            placeholder="프로필 이미지 등록하기"
            name="userimg"
            id="userimg"
          />
        </div>
        <button onClick={onClickJoin}>Join</button>
    </Profile>

  );
};

export default Join;

// 보완해야 할 점 : 값 다 확인하면 올바른 형식이라고 띄워주기