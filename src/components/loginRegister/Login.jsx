import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addLogin } from "../../redux/modules/LogInSlice";
import styles from "./login.module.css"
import Background from "../../res/img/background.png"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  console.log("로그인")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const onLogin = (event) => {
    event.preventDefault();
    if (login.email.trim() === "" || login.password.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    dispatch(addLogin({ login, navigate }));
    setLogin({
      email: "",
      password: "",
    });

  };

  return (
    <div className={styles.wrap}>
      <div className={styles.titleWrap}>
        <img src={Background} alt="" className={styles.title} />
        <form className={styles.inputWrap}>
          <div className={styles.inputBox}>
            <div className={styles.inputName}>이메일</div>
            <input className={styles.input} name="email" value={login.email} onChange={onChange} autoFocus></input>
          </div>
          <div className={styles.inputBox1}>
            <div className={styles.inputName}>비밀번호</div>
            <input className={styles.input} name="password" type="password" defaultChecked="" value={login.password} onChange={onChange}></input>
          </div>
        </form>
        <button className={styles.button} onClick={onLogin}>로그인</button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
