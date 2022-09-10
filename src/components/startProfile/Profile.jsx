import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import S3upload from "react-aws-s3";
import { getUser, putImage, putPassword, deleteUser } from "../../redux/modules/ProfileSlice";
import styles from "./profile.module.css"
import { useEffect } from "react";

window.Buffer = window.Buffer || require("buffer").Buffer;

const Profile = () => {
  const navigate = useNavigate()
  const nickName = useSelector((state) => state.profile.getUser)
  console.log(nickName)
  const imgVal = useRef(null);
  const dispatch = useDispatch();

  const initialState = {
    newImage: "",
    newPassword: "",
    confirm: ""
  }
  

  // 기존 값도 가져와서 state로 만들기(이미지, 닉네임 보여줄 때, 회원탈퇴시 사용)
  const [edit, setEdit] = useState(initialState)
  const [passWord, setPassWord] = useState("")
  const [confirm, setConfirm] = useState("");
  const [userImage, setUserImage] = useState("")

  // 비밀번호 
  const [pwMsg, setPwMsg] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");

  // 비밀번호 정규식
  const pwRule = /^[a-zA-Z0-9]{5,12}$/;

  // 이미지 미리보기
  const [img, setImg] = useState([]);
  const [preImg, setPreImg] = useState([]);

  // useEffect(()=> {
  //   if (checkEmail) {
  //     dispatch(doubleCheckEmail({ email: emailData, setEmailMsg }));
  //   }
  // })

  // 비밀번호 유효성 검사, 원래 사용하던 비밀번호 일 때 사용중인 비밀번호라고 띄워주기
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "newPassword") {
      if (!pwRule.test(value) && value !== "") {
        setPwMsg("비밀번호는 5자 이상 ~ 12자 이하여야 합니다.");
      } else if (pwRule.test(value)) {
        setPwMsg("사용가능한 비밀번호 입니다.");
        setPassWord(value);
      }

      if (value !== "" && edit.confirm !== value) {
        setConfirmMsg("비밀번호가 다릅니다.");
      } else if (edit.confirm === value) {
        setConfirmMsg("비밀번호가 일치합니다.");
      }
    }
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

  //이미지 업로드
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
        let userImage = data.location;
        setUserImage(userImage)
        console.log(userImage)
        setEdit({ ...edit, userImage })
      }
    });
  }
  const onEditProfile = (e) => {
    if (
      userImage === ""
    ) {
    } else {
      dispatch(putImage(edit));
    }
    if (
      passWord === "" ||
      confirm === ""
    ) {
    } else {
      dispatch(putPassword(edit))
    }
  }
  const onDeleteProfile = (e) => {
    dispatch(deleteUser(edit))
  }

  return (
    <div>
      <h1 className={styles.title}>OORIGACHI</h1>
      <h4>회원가입</h4>
      <div className={styles.joinWrap}>
        <div>
          <h2>회원정보 수정</h2>
          <div className={styles.inputBox}>
            <div className={styles.inputName}>닉네임</div>
            <input className={styles.input} disabled />
          </div>
          <div className={styles.inputBox}>
            <div className={styles.inputName}>비밀번호</div>
            <input
              className={styles.input}
              onChange={onChangeHandler}
              type="password"
              name="newPassword"
              id="newPassword"
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
        <div className={styles.profile}>
          <label htmlFor="userImage">
            {!preImg[0] ? (
              <img alt=""></img>
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
            placeholder="프로필 이미지"
            type="file"
            accept="image/*"
            name="userImage"
            id="userImage"
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
// 여기서도 유효성 검사랑 메세지 띄워줘야 함..
export default Profile;