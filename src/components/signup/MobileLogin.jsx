import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addLogin } from "../../redux/modules/LogInSlice";
import styles from "../module.css/Mobile.module.css";
import mobileDuckLogo from "../../res/img/mobileDuckLogo.png"
import prev from "../../res/img/prev.png";
import { ToastContainer, toast } from "react-toastify";

const MobileLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    // 인풋 색상변경 이벤트를 위한 state
    const [activeBorder, setActiveBorder] = useState({
        emailBorder: false,
        passwordBorder: false,
    });
    const { emailBorder, passwordBorder } = activeBorder;

    const onFocusBorder = (border) => {
        setActiveBorder({
            ...activeBorder,
            [border]: true,
        });
    };

    const onBlurBorder = (border) => {
        setActiveBorder({
            ...activeBorder,
            [border]: false,
        });
    };

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
        <div>
            <div className={styles.mobileWrap}>
                <img src={mobileDuckLogo} alt="" className={styles.logoImage} />
                <img src={prev} alt="" className={styles.prev} onClick={() => { navigate("/") }} />
                <div className={styles.mobileInputWarp}>
                    <div className={styles.mobileEmail}>이메일</div>
                    <input
                        className={emailBorder ? styles.mobileYellowEmail : styles.mobileEmailInput}
                        name="email"
                        value={login.email}
                        onChange={onChangeData}
                        onFocus={() => { onFocusBorder('emailBorder') }}
                        onBlur={() => { onBlurBorder('emailBorder') }}
                        autoFocus
                    ></input>
                </div>
                <div className={styles.mobilePassword}>비밀번호</div>
                <input
                    className={passwordBorder ? styles.mobileYellowPass : styles.mobilePassInput}
                    name="password"
                    type="password"
                    defaultChecked=""
                    value={login.password}
                    onChange={onChangeData}
                    onFocus={() => { onFocusBorder('passwordBorder') }}
                    onBlur={() => { onBlurBorder('passwordBorder') }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            onLogin();
                        }
                    }}
                ></input>
                <button className={styles.mobileButton} onClick={onLogin}>
                    로그인
                </button>
                <ToastContainer />
            </div>
        </div>
    );
}
export default MobileLogin;
