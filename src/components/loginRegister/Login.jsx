import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addLogin } from "../../redux/modules/LogInSlice";
import styles from "./Login.module.css";
// import "react-toastify/dist/ReactToastify.css";
import Background from "../../res/img/background.png";
import cloud from "../../res/img/cloud.png";
import cloud1 from "../../res/img/cloud1.png";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const onLogin = (event) => {
    // event.preventDefault();
    if (login.email.trim() === "" || login.password.trim() === "") {
      return toast.warn("모든 항목을 입력해주세요!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch(addLogin({ login, navigate }));
    setLogin({
      email: "",
      password: "",
    });
  };

  return (
    <div className={styles.wrap}>
      <img src={cloud} alt="cloud" className={styles.cloud} />
      <img src={cloud1} alt="cloud1" className={styles.cloud1} />
      <div className={styles.titleWrap}>
        <img src={Background} alt="" className={styles.title} />
        <form className={styles.inputWrap}>
          <div className={styles.inputBox}>
            <div className={styles.inputName}>이메일</div>
            <input
              className={styles.input}
              name="email"
              value={login.email}
              onChange={onChangeData}
              autoFocus
            ></input>
          </div>
          <div className={styles.inputBox1}>
            <div className={styles.inputName}>비밀번호</div>
            <input
              className={styles.input}
              name="password"
              type="password"
              defaultChecked=""
              value={login.password}
              onChange={onChangeData}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onLogin();
                }
              }}
            ></input>
          </div>
        </form>
        <button className={styles.button} onClick={onLogin}>
          로그인
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
