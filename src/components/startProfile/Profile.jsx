import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import S3upload from "react-aws-s3";
import { getUser, putImage, putPassword, deleteUser } from "../../redux/modules/ProfileSlice";
import { ToastContainer, toast } from 'react-toastify';

import profilelogo from "../../res/img/profilelogo.png"
import styles from "./profile.module.css"
import profile from "../../res/img/profile.png"

window.Buffer = window.Buffer || require("buffer").Buffer;

console.log("프로필")
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.profile.result)
  const nickname = user.nickname
  const profileImg = user.userImage

  const initialState = {
    newImage: "",
    newPassword: "",
    confirm: ""
  }
  const imgVal = useRef(null);

  // 기존 값도 가져와서 state로 만들기(이미지, 닉네임 보여줄 때, 회원탈퇴시 사용)
  const [edit, setEdit] = useState(initialState)
  const [passWord, setPassWord] = useState("")
  const [confirm, setConfirm] = useState("");
  const [newImage, setNewImage] = useState("")

  // 비밀번호 
  const [pwMsg, setPwMsg] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");

  // 비밀번호 정규식
  const pwRule = /^[a-zA-Z0-9]{6,12}$/;

  // 이미지 미리보기
  const [img, setImg] = useState([]);
  const [preImg, setPreImg] = useState([]);

  // 토큰 없거나 카카오 소셜 회원일 경우 마이페이지 이용 불가능
  const kakaoLogin = localStorage.getItem("kakaoName")
  useEffect(() => {
    if (kakaoLogin !== null) {
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
        }, navigate("/main"));
    }
  }, []);

  // 닉네임 불러오기
  useEffect(() => {
    dispatch(getUser());
  }, []);

  // 닉네임 수정 불가 마우스오버 이벤트
  const onEditNickName = () => {
    toast.info(
      "닉네임은 수정할 수 없어요!",
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }

  // 비밀번호 유효성 검사, 원래 사용하던 비밀번호 일 때 사용중인 비밀번호라고 띄워주기
  const onChangeHandler = (e) => {
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
    // 확인 비밀번호 유효성 검사
    else if (name === "confirm") {
      if (edit.newPassword !== "" && edit.newPassword !== value) {
        setConfirmMsg("비밀번호가 다릅니다.");
      } else if (edit.newPassword == value) {
        setConfirmMsg("비밀번호가 일치합니다");
        setConfirm(value);
      }
    }
    setEdit({ ...edit, [name]: value })
  }
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
        let newImage = data.location;
        setNewImage(newImage)
        setEdit({ ...edit, newImage })
      }
    });
  }

  // 프로필 이미지 변경 
  useEffect(() => {
    if (newImage) {
      setEdit({ ...edit, newImage })
      dispatch(putImage(edit))
    }
  }, [newImage])

  // 프로필 수정
  const onEditProfile = (e) => {
    if (passWord === "" || confirm === "") {
    } else {
      dispatch(putPassword(edit))
    }
  }
  // 회원 탈퇴
  const onDeleteProfile = (e) => {
    dispatch(deleteUser(edit))
  }

  return (
    <div className={styles.background}>
      <div className={styles.inputWrap}>
        <img className={styles.backgroundImg} src={profilelogo} alt="" />
        <input value={nickname} type="text" onMouseDown={onEditNickName} className={styles.inputNickname} readOnly />
        <input
          className={styles.inputPassword}
          onChange={onChangeHandler}
          type="password"
          name="newPassword"
          id="newPassword"
          minLength="6"
          maxLength="12"
          autoFocus
          autoComplete="new-password"
          placeholder="6자 이상 12자 이하로 입력해주세요."
        />
        <input
          className={styles.inputConfirm}
          onChange={onChangeHandler}
          type="password"
          name="confirm"
          minLength="6"
          maxLength="12"
          required
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
            {{ profileImg } ? (<img src={profileImg} alt="" />) :
              preImg[0] ? (<img src={preImg} alt="" />) :
                <img src={profile} alt="" />}
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
      <button onClick={onEditProfile} className={styles.button}>저장</button>
      <ToastContainer />
      <button onClick={onDeleteProfile} className={styles.button2}>회원 탈퇴</button>
      <ToastContainer />
    </div>
  );
};

export default Profile;