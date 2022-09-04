import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addJoin, doubleCheckEmail, doubleCheckNickName } from "../../redux/modules/JoinSlice";
import { uploadFile } from 'react-s3';

import styles from "./join.module.css"
import pencil from "../../res/img/pencil.svg"

window.Buffer = window.Buffer || require("buffer").Buffer;

// S3 이미지 업로드를 위한 액세스 키
const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const Join = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    email: "",
    nickname: "",
    password: "",
    confirm: "",
  };
  // State
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkNickName, setCheckNickName] = useState(false)
  // 회원가입 state
  const [signUp, setSignUp] = useState(initialState);
  const [emailData, setEmailData] = useState("");
  const [nicknNameData, setNickNameData] = useState("")
  const [passData, setPassData] = useState("");
  const [confirm, setConfirm] = useState("");
  // 프로필 이미지 state
  const [img, setImg] = useState([]);
  const [preImg, setPreImg] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  //유효성 확인 state
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
        setEmailData(value);
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

  // 모든 값 입력했는지 확인 후 전송
  const onClickJoin = (e) => {
    if (
      emailData === "" ||
      nicknNameData === "" ||
      passData === "" ||
      confirm === ""
    ) {
    } else {
      dispatch(addJoin({ navigate, signUp }));
    }
    dispatch(addJoin({ navigate, signUp }));
  }

  // 이미지 미리보기 
  const onLoadImg = (e) => {
    const imaData = e.target.files[0];
    setImg(imaData);

    const imageUrl = URL.createObjectURL(imaData);
    setPreImg(imageUrl);
    
    setSelectedFile(e.target.files[0]);
  };

  // 이미지 파일 업로드
  const handleUpload = async (file) => {
    uploadFile(file, config)
        .then(data => console.log(data))
        .catch(err => console.error(err))
}

  return (
    <div>
      <div className={styles.joinWrap}>
        <div>
          <div className={styles.inputBox}>
            <div className={styles.inputName}>이메일</div>
            <input
              className={styles.input}
              onChange={onChangeHandler}
              type="mail"
              id="email"
              name="email"
            />
          </div>
          <div className={styles.message}>{emailMsg}</div>
          <div className={styles.inputBox}>
            <div className={styles.inputName}>닉네임</div>
            <input
              className={styles.input}
              onChange={onChangeHandler}
              type="text"
              id="nickname"
              name="nickname"
              maxLength="10"
            />
          </div>
          <div className={styles.message}>{nickNameMsg}</div>
          <div className={styles.inputBox}>
            <div className={styles.inputName}>비밀번호</div>
            <input
              className={styles.input}
              onChange={onChangeHandler}
              type="password"
              name="password"
              id="password"
              minLength="5"
              maxLength="12"
            />
          </div>
          <div className={styles.message}>{pwMsg}</div>
          <div className={styles.inputBox}>
            <div className={styles.inputName}>비밀번호 확인</div>
            <input
              className={styles.input}
              onChange={onChangeHandler}
              type="password"
              name="confirm"
              minLength="5"
              maxLength="12"
              required
            />
          </div>
          <div className={styles.message}>{confirmMsg}</div>
        </div>
        <div>
          <div className={styles.profile}>
            <label htmlFor="profileImg">
            {!preImg[0] ? (
              <img src={pencil} alt=""></img>
            ) : (
              <img src={preImg} alt="" />
            )}</label>
            <h4>프로필 이미지</h4>
          </div>
          
          <form onChange={() => handleUpload(selectedFile)}>
            <input
              className={styles.inputHidden}
              onChange={onLoadImg}
              placeholder="프로필 이미지"
              type="file"
              accept="image/*"
              name="profileImg"
              id="profileImg"
            />
          </form>
        </div>
      </div>
      <div className={styles.buttonWrap}>
        <button className={styles.button} onClick={onClickJoin}>회원가입</button>
      </div>

    </div>
  );
};

export default Join;