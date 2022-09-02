import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addJoin, doubleCheckEmail, doubleCheckNickName } from "../../redux/modules/JoinSlice";
import styles from "./join.module.css"

const Join = () => {
  const dispatch = useDispatch();
  const initialState = {
    email: "",
    nickname: "",
    password: "",
    confirm: "",
  };

  const navigate = useNavigate();

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkNickName, setCheckNickName] = useState(false)

  const [signUp, setSignUp] = useState(initialState);
  const [emailData, setEmailData] = useState("");
  const [nicknNameData, setNickNameData] = useState("")
  const [passData, setPassData] = useState("");
  const [confirm, setConfirm] = useState("");
  const [img, setImg] = useState([]);
  const [preImg, setPreImg] = useState([]);

  //유효성 확인 메세지
  const [emailMsg, setEmailMsg] = useState("");
  const [nickNameMsg, setNickNameMsg] = useState("")
  const [pwMsg, setPwMsg] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");

  // 정규식 리스트
  const emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const pwRule = /^[a-zA-Z0-9]{5,12}$/;
  const nickNameRule = /^[ㄱ-ㅎ가-힣ㅏ-ㅣa-zA-Z0-9]{2,10}$/;

  // Email 중복 확인
  useEffect(() => {
    if (checkEmail) {
      dispatch(doubleCheckEmail({ email: emailData, setEmailMsg }));
    }
  }, [emailData]);

  // 닉네임 중복 확인
  useEffect(() => {
    if (checkNickName) {
      dispatch(doubleCheckNickName({ nickname: nicknNameData, setNickNameMsg }));
    }
  }, [nicknNameData]);

  // 유효성 검사
  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    // 이메일 유효성
    if (name === "email") {
      if (emailRule.test(value) && value !== "") {
        setEmailData(value);
        setCheckEmail(true);
      } else if (!emailRule.test(value)) {
        setEmailMsg("이메일 형식에 맞게 입력해주세요.");
        setCheckEmail(false);
      }
    }

    // 닉네임 유효성
    else if (name === "nickname") {
      if (!nickNameRule.test(value)) {
        setNickNameData(value);
        setCheckNickName(true);
        setNickNameMsg(
          "닉네임은 특수문자 제외 2~10 글자로 입력할 수 있습니다."
        );
      } else if (nickNameRule.test(value)) {
        setNickNameMsg("닉네임 형식에 맞습니다.");
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
    else if (name === "confirm") {
      if (signUp.password !== "" && signUp.password !== value) {
        setConfirmMsg("비밀번호가 다릅니다.");
      } else if (signUp.password == value) {
        setConfirmMsg("비밀번호가 일치합니다");
        setConfirm(value);
      }
    }
    setSignUp({ ...signUp, [name]: value });
  };

  // 버튼 클릭시 빈칸 확인, 올바르게 입력시 값 전송
  const onClickJoin = (e) => {
    if (
      emailData === "" ||
      nicknNameData === "" ||
      passData === "" ||
      confirm === ""
    ) {
    } else {
      dispatch(addJoin({ navigate, signUp }));
    } // dispatch에 값도 같이 넣어서 보내줘유
    dispatch(addJoin({ navigate, signUp }));
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
    <div>
      <div>
        <div>
          <div>Email</div>
          <input
            onChange={onChangeHandler}
            type="mail"
            id="email"
            name="email"
          />
          <span>{emailMsg}</span>
        </div>
        <div>
          <div>Nickname</div>
          <input
            onChange={onChangeHandler}
            type="text"
            id="nickname"
            name="nickname"
            maxLength="10"
          />
          <span>{nickNameMsg}</span>
        </div>
        <div>
          <div>Password</div>
          <input
            onChange={onChangeHandler}
            type="password"
            name="password"
            id="password"
            minLength="5"
            maxLength="12"
          />
          <span>{pwMsg}</span>
        </div>
        <div>
          <div>Confirm</div>
          <input
            onChange={onChangeHandler}
            type="password"
            name="confirm"
            minLength="5"
            maxLength="12"
            required
          />
          <span>{confirmMsg}</span>
        </div>
      </div>
      <div>
        <div>프로필</div>
        <div>
          {/* {!preImgFile[0] ? (
      <img src={base_img} alt="이미지 미리보기" />
    ) : (
      <img src={preImgFile} alt="이미지 미리보기" />
    )} */}
          <label>사진 업로드</label>
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
    </div>

  );
};

export default Join;

// 보완해야 할 점 : 값 다 확인하면 올바른 형식이라고 띄워주기