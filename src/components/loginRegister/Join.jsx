import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addJoin,
  doubleCheckEmail,
  doubleCheckNickName,
} from "../../redux/modules/JoinSlice";
import S3upload from "react-aws-s3";
import styles from "./Join.module.css";
import logo from "../../res/img/logo.png";
import profile from "../../res/img/profile.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

window.Buffer = window.Buffer || require("buffer").Buffer;

const Join = () => {
  const dispatch = useDispatch();
  const imgVal = useRef(null);
  const navigate = useNavigate();

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkNickName, setCheckNickName] = useState(false);
  // 회원가입
  const [signUp, setSignUp] = useState(initialState);
  const [emailData, setEmailData] = useState("");
  const [nicknNameData, setNickNameData] = useState("");
  const [passData, setPassData] = useState("");
  const [confirm, setConfirm] = useState("");
  const [userImage, setUserImage] = useState("");
  // img
  const [img, setImg] = useState([]);
  const [preImg, setPreImg] = useState([]);
  //유효성 확인 메세지
  const [emailMsg, setEmailMsg] = useState("");
  const [nickNameMsg, setNickNameMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");

  const initialState = {
    email: "",
    nickname: "",
    userImage: "",
    password: "",
    confirm: "",
  };

  // 정규식 리스트
  const emailRule =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const pwRule = /^[a-zA-Z0-9]{6,12}$/;
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
      dispatch(
        doubleCheckNickName({ nickname: nicknNameData, setNickNameMsg })
      );
    }
  }, [nicknNameData]);

  // 유효 이메일 인증
  const onCertifyEmail = () => {};

  // 유효성 검사
  const onValidation = (e) => {
    const { name, value } = e.target;

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
        setPwMsg("비밀번호는 6자 이상 ~ 12자 이하여야 합니다.");
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

  //이미지 미리보기
  const onLoadImg = (event) => {
    //현재 이미지 파일
    const imaData = event.target.files[0];
    setImg(imaData);
    //선택한 이미지 파일의 url
    const imageUrl = URL.createObjectURL(imaData);
    setPreImg(imageUrl);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //이미지 처리
    const file = imgVal.current.files[0];
    const newFileName = imgVal.current.files[0].name;

    const config = {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
    };
    //aws 서버에 등록
    const s3Client = new S3upload(config);
    s3Client.uploadFile(file, newFileName).then(async (data) => {
      if (data.status === 204) {
        let userImage = data.location;
        setUserImage(userImage);
        console.log(userImage);
        setSignUp({ ...signUp, userImage });
      }
    });
  };
  // 버튼 클릭시 빈칸 확인
  const onJoin = (e) => {
    if (
      emailData === "" ||
      nicknNameData === "" ||
      userImage === "" ||
      passData === "" ||
      confirm === ""
    ) {
    } else {
      dispatch(addJoin({ navigate, signUp }));
    }
    dispatch(addJoin({ navigate, signUp }));
  };

  return (
    <div className={styles.background}>
      {/* Input 모음 */}
      <div className={styles.inputWrap}>
        <img className={styles.backgroundImg} src={logo} alt="" />
        <input
          className={styles.inputNickname}
          onChange={onValidation}
          type="text"
          id="nickname"
          name="nickname"
          maxLength="10"
          placeholder="오리가치"
          autoFocus
        />
        <input
          className={styles.inputEmail}
          onChange={onValidation}
          type="mail"
          id="email"
          name="email"
          placeholder="oorigachi@email.com"
        />
        <input
          className={styles.inputPassword}
          onChange={onValidation}
          type="password"
          name="password"
          id="password"
          minLength="6"
          maxLength="12"
          placeholder="6자 이상 12자 이하로 입력해주세요."
        />
        <input
          className={styles.inputConfirm}
          onChange={onValidation}
          type="password"
          name="confirm"
          minLength="6"
          maxLength="12"
          required
          placeholder="비밀번호를 확인해주세요."
        />
        {/* 입력값 확인 메세지 모음 */}
        <div className={styles.message}>
          <div className={styles.emailMsg}>{emailMsg}</div>
          <div className={styles.nickNameMsg}>{nickNameMsg}</div>
          <div className={styles.pwMsg}>{pwMsg}</div>
          <div className={styles.confirmMsg}>{confirmMsg}</div>
        </div>
      </div>
      {/* inputName 모음 */}
      <div className={styles.nameWrap}>
        <div className={styles.email}>이메일</div>
        <div className={styles.nickname}>닉네임</div>
        <div className={styles.password}>비밀번호</div>
        <div className={styles.confirm}>비밀번호 확인</div>
      </div>
      {/* 프로필 이미지 */}
      <div>
        <div className={styles.profile}>
          <label htmlFor="userImage">
            {!preImg[0] ? (
              <img src={profile} alt=""></img>
            ) : (
              <img src={preImg} alt="" />
            )}
          </label>
          <h4>프로필 이미지</h4>
        </div>
        <form onChange={onSubmitHandler}>
          <input
            ref={imgVal}
            className={styles.inputHidden}
            onChange={onLoadImg}
            placeholder="프로필 이미지"
            type="file"
            accept="image/*"
            name="userImage"
            id="userImage"
          />
        </form>
      </div>
      {/* 이메일 인증 버튼 */}
      <button className={styles.certifyButton} onClick={onCertifyEmail}>
        인증
      </button>
      {/* 회원가입 버튼 */}
      <button className={styles.button} onClick={onJoin}>
        회원가입
      </button>
      <ToastContainer />
    </div>
  );
};

export default Join;
