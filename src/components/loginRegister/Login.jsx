import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addLogin } from "../../redux/modules/LogInSlice";
import styles from "./login.module.css"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const onChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const onClick = (event) => {
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
    <div className={styles.titleWrap}>
      <h1 className={styles.title}>ORIGACHI</h1>
      <form>
        <div className={styles.inputBox}>
          email:
          <input className={styles.input} name="email" value={login.email} onChange={onChange}></input>
          <br />
          Password:
          <input className={styles.input} name="password" type="password" defaultChecked="" value={login.password} onChange={onChange}></input>
        </div>
        <button className={styles.button} onClick={onClick}>LogIn</button>
      </form>
    </div>
  );
};

export default Login;