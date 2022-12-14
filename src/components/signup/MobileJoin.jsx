import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addJoin,
  doubleCheckEmail,
  doubleCheckNickName,
  invalidEmail,
} from "../../redux/modules/JoinSlice";
import InvalidCodeModal from "./joinModal/InvalidCodeModal";
import styles from "../module.css/Mobile.module.css";
import profile from "../../res/img/profile.png";
import prev from "../../res/img/prev.png";
import { ToastContainer } from "react-toastify";

window.Buffer = window.Buffer || require("buffer").Buffer;

const MobileJoin = () => {
  const dispatch = useDispatch();
  const imgVal = useRef(null);
  const navigate = useNavigate();
  const hover = useSelector((state) => state.join?.result?.result);

  const initialState = {
    email: "",
    nickname: "",
    userImage: "",
    password: "",
    confirm: "",
  };

  // 닉네임, 이메일 중복확인
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkNickName, setCheckNickName] = useState(false);

  // 모달
  const [modalOpen, setModalOpen] = useState(false);
  const [clickButton, setClickButton] = useState(false);

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

  // 정규식 리스트
  const emailRule =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const pwRule = /^[a-zA-Z0-9]{6,12}$/;
  const nickNameRule = /^[ㄱ-ㅎ가-힣ㅏ-ㅣa-zA-Z0-9]{2,10}$/;

  // Email 중복 확인
  useEffect(() => {
    if (checkEmail) {
      dispatch(doubleCheckEmail({ email: emailData, setEmailMsg }));
      dispatch(invalidEmail({ email: emailData }));
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

  useEffect(() => {
    if (hover === true) {
      navigate("/join");
    }
  }, []);
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

  // 모달창 이메일 빈칸 아니고, 중복확인 됐을 때만 열림
  const openModal = () => {
    if (checkEmail === true) {
      setModalOpen(true);
    } else if (setClickButton(true)) {
      openModal();
    } else {
      return null;
    }
  };
  // 모달창 닫힘
  const closeModal = () => {
    setModalOpen(false);
  };

  // 버튼 클릭시 빈칸 확인
  const onJoin = (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("email", emailData);
      formdata.append("nickname", nicknNameData);
      formdata.append("password", passData);
      formdata.append("confirm", confirm);
      formdata.append("img", img);
      dispatch(addJoin({ navigate, formdata }));
  };

  return (
    <form encType="multipart/form-data">
      <div className={styles.background}>
        <div className={styles.title}>
          <h4>회원가입</h4>
          <img
            src={prev}
            alt=""
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className={styles.profile}>
          <p>프로필 이미지</p>
          <label htmlFor="userImage">
            {!preImg[0] ? (
              <img src={profile} alt=""></img>
            ) : (
              <img src={preImg} alt="" />
            )}
          </label>

          <input
            ref={imgVal}
            onChange={onLoadImg}
            placeholder="프로필 이미지"
            type="file"
            accept="image/*"
            name="userImage"
            id="userImage"
          />
        </div>
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
          autoComplete="new-password"
        />
        <button
          className={
            hover === true ? styles.certifyButton : styles.notCertifyButton
          }
          onClick={openModal}
        >
          {hover === true ? "완료" : "인증"}
        </button>
        <InvalidCodeModal
          open={modalOpen}
          close={closeModal}
          email={emailData}
          text={"인증번호를 입력해주세요."}
        />
        <input
          className={styles.inputPassword}
          onChange={onValidation}
          type="password"
          name="password"
          id="password"
          placeholder="6자 이상 12자 이하로 입력해주세요."
          minLength="6"
          maxLength="12"
          autoComplete="new-password"
        />
        <input
          className={styles.inputConfirm}
          onChange={onValidation}
          type="password"
          name="confirm"
          placeholder="비밀번호를 확인해주세요."
          minLength="6"
          maxLength="12"
          required
          autoComplete="new-password"
        />
        {/* input message 모음 */}
        <div className={styles.emailMsg}>{emailMsg}</div>
        <div className={styles.nickNameMsg}>{nickNameMsg}</div>
        <div className={styles.pwMsg}>{pwMsg}</div>
        <div className={styles.confirmMsg}>{confirmMsg}</div>
        {/* inputName 모음 */}
        <div className={styles.nickname}>닉네임</div>
        <div className={styles.email}>이메일</div>
        <div className={styles.password}>비밀번호</div>
        <div className={styles.confirm}>비밀번호 확인</div>
        {/* 회원가입 버튼 */}
        <button className={styles.button} onClick={onJoin}>
          회원가입
        </button>
        <ToastContainer />
      </div>
    </form>
  );
};

export default MobileJoin;
