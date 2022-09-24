import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { invalidEmailCheck } from "../../../redux/modules/JoinSlice";

const InvalidCodeModal = (props) => {
    const dispatch = useDispatch();
    // 유효 코드
    const [code, setCode] = useState("");
    const { open, close, text, email } = props;

    // 입력한 코드 code에 넣어주기
    const onCode = (e) => {
        setCode(e.target.value)
    }
    console.log(code)
    // 이메일 인증 코드 보내기
    const onCheckEmailCode = () => {
        dispatch(invalidEmailCheck({ email: email, code: code }))
        console.log("emailData",email)
    }
    return (
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <div>
                    <div>
                        {text}
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </div>
                    <div>
                        <input type="text" onChange={onCode} />
                    </div>
                    <div>
                        <button onClick={onCheckEmailCode}>
                            인증하기
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default InvalidCodeModal;
