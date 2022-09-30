import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { invalidEmailCheck } from "../../../redux/modules/JoinSlice";
import "../../detailSchedule/modal/MemberAddModal.css";

const InvalidCodeModal = (props) => {
  const dispatch = useDispatch();
  // 유효 코드
  const [code, setCode] = useState("");
  const { open, close, text, email } = props;

  // 입력한 코드 code에 넣어주기
  const onCode = (e) => {
    setCode(e.target.value);
  };

  // 이메일 인증 코드 보내기
  const onCheckEmailCode = () => {
    dispatch(invalidEmailCheck({ email: email, code: code }));
  };

  window.addEventListener("mousedown", (e) => {
    if (e.target.className === "openModal modal") {
      e.stopPropagation();
      close();
    }
  });

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {text}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <input type="text" name="inputText" onChange={onCode} />
          </main>
          <footer>
            <button onClick={onCheckEmailCode}>인증하기</button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default InvalidCodeModal;
