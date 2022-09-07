import { useState, useRef } from "react";
import S3upload from "react-aws-s3";
import { getUser, putImage, putPassword, deleteUser } from "../../redux/modules/ProfileSlice";
import styles from "./profile.module.css"

window.Buffer = window.Buffer || require("buffer").Buffer;

const Profile = () => {
  const imgVal = useRef(null);

  const [pwMsg, setPwMsg] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");
  const [img, setImg] = useState([]);
  const [preImg, setPreImg] = useState([]);

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
        // setUserImage(userImage)
        console.log(userImage)
        // setSignUp({ ...signUp, userImage })
      }
    });
  }
  return (
    <div>
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
              // onChange={onChangeHandler}
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
              // onChange={onChangeHandler}
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
        <button className={styles.button}>저장</button>
        <button className={styles.button2}>회원 탈퇴</button>
      </div>
    </div>
  );
};
// 여기서도 유효성 검사랑 메세지 띄워줘야 함..
export default Profile;