import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  putImage,
  putPassword,
} from "../../redux/modules/ProfileSlice";
import DeleteModal from "./modal/DeleteModal";
import styles from "../module.css/Profile.module.css";
import profileLogo from "../../res/img/profileLogo.png";
import backgroundbox from "../../res/img/backgroundBox.png";
import profile from "../../res/img/profile.png";
import { ToastContainer, toast } from "react-toastify";

window.Buffer = window.Buffer || require("buffer").Buffer;

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.profile.result);
  const imgVal = useRef(null);

  const initialState = {
    newImage: "",
    newPassword: "",
    confirm: "",
  };

  // 기존 값도 가져와서 state로 만들기(이미지, 닉네임 보여줄 때, 회원탈퇴시 사용)
  const [edit, setEdit] = useState(initialState);
  const [passWord, setPassWord] = useState("");
  const [confirm, setConfirm] = useState("");
  // 비밀번호
  const [pwMsg, setPwMsg] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");
  // 프로필 이미지처리
  const [img, setImg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  //변수
  const nickname = user.nickname;
  const profileImg = user.userImage;
  const tokenValue = localStorage.getItem("jwtToken");
  // 비밀번호 정규식
  const pwRule = /^[a-zA-Z0-9]{6,12}$/;

  // 토큰없으면 로그인 페이지로
  useEffect(() => {
    if (!tokenValue) {
      navigate("/");
    }
  }, []);

  // 이미지,닉네임 불러오기
  useEffect(() => {
    dispatch(getUser());
    setImg(profileImg);
  }, []);

  // 닉네임 수정 불가 마우스오버 이벤트
  const onEditNickName = () => {
    toast.info("닉네임은 수정할 수 없어요!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // 비밀번호 유효성 검사, 원래 사용하던 비밀번호 일 때 사용중인 비밀번호라고 띄워주기
  const onInvalidTest = (e) => {
    const { name, value } = e.target;
    // 비밀번호 유효성 검사
    if (name === "newPassword") {
      if (!pwRule.test(value) && value !== "") {
        setPwMsg("비밀번호는 6자 이상 ~ 12자 이하여야 합니다.");
      } else if (pwRule.test(value)) {
        setPwMsg("사용가능한 비밀번호 입니다.");
        setPassWord(value);
      }
      // 비밀번호 확인 먼저 작성되었을 경우
      if (value !== "" && edit.confirm !== value) {
        setConfirmMsg("비밀번호가 다릅니다.");
      } else if (edit.confirm === value) {
        setConfirmMsg("비밀번호가 일치합니다.");
      }
    }
    // 비밀번호 확인 유효성 검사
    else if (name === "confirm") {
      if (edit.newPassword !== "" && edit.newPassword !== value) {
        setConfirmMsg("비밀번호가 다릅니다.");
      } else if (edit.newPassword == value) {
        setConfirmMsg("비밀번호가 일치합니다");
        setConfirm(value);
      }
    }
    setEdit({ ...edit, [name]: value });
  };
  //프로필 이미지 수정
  const onLoadImg = (event) => {
    const imaData = event.target.files[0];
    const formdata = new FormData();
    formdata.append("img", imaData);
    dispatch(putImage(formdata));

    const imageUrl = URL.createObjectURL(imaData);
    setImg(imageUrl);
  };

  // 비밀번호 수정
  const onEditProfile = (e) => {
    if (passWord === "" || confirm === "") {
      return toast.warn("비밀번호를 확인해주세요!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(putPassword(edit));
    }
  };
  // 모달창 열림/닫힘
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className={styles.background}>
      <div className={styles.inputWrap}>
        <img
          className={styles.profileLogo}
          src={profileLogo}
          alt=""
          onClick={() => {
            navigate("/main");
          }}
        />
        <img className={styles.backgroundImg} src={backgroundbox} alt="" />
        <input
          value={nickname || ""}
          type="text"
          onMouseDown={onEditNickName}
          className={styles.inputNickname}
          readOnly
        />
        <input
          className={styles.inputPassword}
          onChange={onInvalidTest}
          type="password"
          name="newPassword"
          id="newPassword"
          minLength="6"
          maxLength="12"
          autoComplete="new-password"
          placeholder="6자 이상 12자 이하로 입력해주세요."
        />
        <input
          className={styles.inputConfirm}
          onChange={onInvalidTest}
          type="password"
          name="confirm"
          minLength="6"
          maxLength="12"
          autoComplete="new-password"
          placeholder="비밀번호를 확인해주세요."
        />
        <div className={styles.message}>
          <div className={styles.pwMsg}>{pwMsg}</div>
          <div className={styles.confirmMsg}>{confirmMsg}</div>
        </div>
        {/* 인풋네임 모음 */}
        <div className={styles.nameWrap}>
          <div className={styles.nickname}>닉네임</div>
          <div className={styles.password}>비밀번호 변경</div>
          <div className={styles.confirm}>비밀번호 확인</div>
        </div>
        <div className={styles.profile}>
          <label htmlFor="newImage">
            {img === "" ? (
              <img src={profile} alt="프로필 없음 이미지" />
            ) : (
              <img src={img} alt="프로필 이미지" />
            )}
          </label>
          <h4>프로필 이미지</h4>
        </div>
        <form encType="multipart/form-data">
          <input
            ref={imgVal}
            className={styles.inputHidden}
            onChange={onLoadImg}
            type="file"
            accept="image/*"
            name="newImage"
            id="newImage"
          />
        </form>
        <button onClick={onEditProfile} className={styles.button}>
          저장
        </button>
        <ToastContainer />
        <button onClick={openModal} className={styles.button2}>
          회원 탈퇴
        </button>
        <DeleteModal
          open={modalOpen}
          close={closeModal}
          edit={edit}
          text={"정말로 탈퇴하시겠어요?🥲"}
        />
      </div>
    </div>
  );
};

export default Profile;
