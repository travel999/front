import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addLogin } from "../../redux/modules/LogInSlice";
import {
  TitleWrap,
  Title,
} from "./LoginStyle"

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
    <TitleWrap>
      <Title>Service Name</Title>
      <form>
        <div>
        email:
          <input name="email" value={login.email} onChange={onChange}></input>
          <br />
          Password:
          <input name="password" type="password" defaultChecked="" value={login.password} onChange={onChange}></input>
        </div>
        <button onClick={onClick}>LogIn</button>
      </form>
    </TitleWrap>
  );
};

export default Login;