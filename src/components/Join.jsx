import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addJoin, doubleCheckId } from "../redux/modules/JoinSlice";
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

  const [checkId, setCheckId] = useState(false);
  const [signUp, setSignUp] = useState(initialState);
  const [emailData, setEmailData] = useState("");
  const [nicknNameData, setNickNameData] = useState("")
  const [passData, setPassData] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [img, setImg] = useState([]);
  const [preImg, setPreImg] = useState([]);

  //유효성 확인 메세지
  const [idMsg, setIdMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [nickNameMsg, setNickNameMsg] = useState("")
  const [confirmMsg, setConfirmMsg] = useState("");

  // 정규식 리스트
  const idRule = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{3}$/;
  const pwRule = /^[a-zA-Z0-9]{5,12}$/;
  const nickNameRule = /^[ㄱ-ㅎ가-힣ㅏ-ㅣa-zA-Z0-9]{1,10}$/;

  // ID 중복 확인
  const dispatch = useDispatch();
  useEffect(() => {
    if (checkId) {
      dispatch(doubleCheckId({ email: emailData, setIdMsg }));
    }
  }, [checkId]);

  //----이벤트 함수----

  // 입력값 바뀔때 유효성 검사 하는 체인지핸들러
  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    // 아이디 유효성(메일형식이 맞는지 확인하기))
    if (name === "email") {
      if (idRule.test(value) && value !== "") {
        setEmailData(value);
        setCheckId(true);
      } else if (!idRule.test(value)) {
        setIdMsg("이메일 형식에 맞게 입력해주세요.");
      }
    }
    // 닉네임 유효성
    else if (name === "nickname") {
      if (!nickNameRule.test(value)) {
        setNickNameMsg(
          "닉네임은 특수문자를 포함할 수 없으며, 1~10글자로 입력할 수 있습니다."
        );
      } else if (nickNameRule.test(value)) {
        setNickNameMsg("사용가능한 닉네임입니다.");
        setNickNameData(value);
      }
    }

    // 비밀번호 유효성
    else if (name === "password") {
      if (!pwRule.test(value) && value !== "") {
        setPwMsg("비밀번호는 5자 이상 ~ 12자 이하여야 합니다.");
      } else if (pwRule.test(value)) {
        setPwMsg("사용가능한 비밀번호 입니다.");
        setPassData(value);
      }

      //2차 비밀번호 작성 후 비밀번호 작성 시 유효성 체크 로직
      if (value !== "" && signUp.confirm !== value) {
        setConfirmMsg("비밀번호가 다릅니다.");
      } else if (signUp.confirm === value) {
        setConfirmMsg("비밀번호가 일치합니다.");
      }
    }
    // 비밀번호 확인 유효성
    else if (name === "confirmPassword") {
      if (signUp.password !== "" && signUp.password !== value) {
        setConfirmMsg("비밀번호가 다릅니다.");
      } else if (signUp.password == value) {
        setConfirmMsg("비밀번호가 일치합니다");
        setConfirmPass(value);
      }
    }
    setSignUp({ ...signUp, [name]: value });
  };


  const onClickJoin = (e) => {
    // if (
    //   email == "" ||
    //   nickName === "" ||
    //   passWord === "" ||
    //   confirm === ""
    // ) {
    //   alert("내용을 모두 입력해주세요");
    // } else {
    //   dispatch(addJoin({ navigate, }));
    // }
    dispatch(addJoin({ navigate }));
  }

  //이미지 파일 체인지 핸들러
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
          <span>{idMsg}</span>
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
            name="confirm"
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