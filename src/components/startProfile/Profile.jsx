import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  putImage,
  putPassword,
} from "../../redux/modules/ProfileSlice";
import DeleteModal from "./modal/DeleteModal";
import S3upload from "react-aws-s3";

import styles from "./profile.module.css";
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
  const [newImage, setNewImage] = useState("");
  // 비밀번호
  const [pwMsg, setPwMsg] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");
  // 비밀번호 정규식
  const pwRule = /^[a-zA-Z0-9]{6,12}$/;
  // 이미지 미리보기
  const [img, setImg] = useState([]);
  const [preImg, setPreImg] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  //
  const nickname = user.nickname;
  const profileImg = user.userImage;
  const image = localStorage.getItem("image");
  const provider = localStorage.getItem("provider");
  const config = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
  };

  // 토큰 없거나 카카오 소셜 회원일 경우 마이페이지 이용 불가능
  useEffect(() => {
    if (provider !== null) {
      toast.warn(
        "소셜로그인 회원은 프로필을 사용할 수 없어요!",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        },
        setTimeout(() => {
          navigate("/main");
        }, 2000)
      );
    }
  }, []);

  // 닉네임 불러오기
  useEffect(() => {
    dispatch(getUser());
  }, []);

  // 프로필 이미지 변경
  useEffect(() => {
    if (newImage) {
      setEdit({ ...edit, newImage });
      dispatch(putImage(edit));
    }
  }, [newImage]);

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
  // 선택한 이미지 미리보기
  const onLoadImg = (event) => {
    const imaData = event.target.files[0];
    setImg(imaData);
    //선택한 이미지 파일의 url
    const imageUrl = URL.createObjectURL(imaData);
    setPreImg(imageUrl);
  };

  //S3 서버에 이미지 업로드
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let file = imgVal.current.files[0];
    let newFileName = imgVal.current.files[0].name;

    const s3Client = new S3upload(config);
    s3Client.uploadFile(file, newFileName).then(async (data) => {
      if (data.status === 204) {
        let newImage = data.location;
        setNewImage(newImage);
        setEdit({ ...edit, newImage });
      }
    });
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
            {{ profileImg } ? (
              <img src={profileImg} alt="" />
            ) : preImg[0] ? (
              <img src={preImg} alt="" />
            ) : (
              <img src={profile} alt="" />
            )}
          </label>
          {/* 여기 기본이미지 안보인다.. 하 */}
          <h4>프로필 이미지</h4>
        </div>
        <form onChange={onSubmitHandler}>
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
      </div>
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
  );
};

export default Profile;
