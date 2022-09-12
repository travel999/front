import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../res/cookie";
import S3upload from "react-aws-s3";
import { getUser, putImage, putPassword, deleteUser } from "../../redux/modules/ProfileSlice";

import styles from "./profile.module.css"
import pencil from "../../res/img/pencil.svg"

window.Buffer = window.Buffer || require("buffer").Buffer;

console.log("프로필")
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state)
  console.log(profile)
  
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
  const [nickname, setNickname] = useState("")

  // 비밀번호 
  const [pwMsg, setPwMsg] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");

  // 비밀번호 정규식
  const pwRule = /^[a-zA-Z0-9]{6,12}$/;

  // 이미지 미리보기
  const [img, setImg] = useState([]);
  const [preImg, setPreImg] = useState([]);

  // 토큰 없으면 못 들어오게
  const loginToken = (getCookie("jwtToken"))
  useEffect(() => {
    if (loginToken === "") {
      alert("로그인 후 이용해주세요!")
      navigate("/");
    }
  }, []);

  // 닉네임 불러오기
  useEffect(() => {
      dispatch(getUser());
      console.log(getUser.response)
  }, []);

  // 닉네임 수정 불가 마우스오버 이벤트
  const onEditNickName = () => {
    alert("닉네임은 수정할 수 없어요.")
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
    <div>
      <h1 className={styles.title} onClick={() => navigate("/main")}>OORIGACHI</h1>
      <div className={styles.joinWrap}>
        <div>
          <h2>회원정보 수정</h2>
          <div className={styles.inputBox}>
            <div className={styles.inputName}>닉네임</div>
            <input value={nickname} type="text" onMouseDown={onEditNickName} className={styles.nickInput} readOnly />
          </div>
          <div className={styles.inputBox}>
            <div className={styles.inputName}>비밀번호 변경</div>
            <input
              className={styles.input}
              onChange={onChangeHandler}
              type="password"
              name="newPassword"
              id="newPassword"
              minLength="6"
              maxLength="12"
              autoFocus
              autoComplete="new-password"
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
              minLength="6"
              maxLength="12"
              required
              autoComplete="new-password"
            />
          </div>
          <div className={styles.message}>{confirmMsg}</div>
        </div>
        <div className={styles.profile}>
          <label htmlFor="newImage">
            {!preImg[0] ? (
              <img src={pencil} alt=""></img>
            ) : (
              <img src={preImg} alt="" />
            )}</label>
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
      <div className={styles.buttonWrap}>
        <button onClick={onEditProfile} className={styles.button}>저장</button>
        <button onClick={onDeleteProfile} className={styles.button2}>회원 탈퇴</button>
      </div>
    </div>
  );
};

export default Profile;