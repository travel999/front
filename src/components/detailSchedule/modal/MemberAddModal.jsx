import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveNickName } from "../../../redux/modules/InviteSlice";
import "./MemberAddModal.css";

const MemberAddModal = (props) => {
  const dispatch = useDispatch();

  const [nickName, setNickName] = useState("");
  const [message, setMessage] = useState("");

  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, postId } = props;

  const onGetNickName = (e) => {
    setNickName(e.target.value);
  };
  const onAddMember = () => {
    dispatch(saveNickName({ nickname2: nickName, postId: postId, setMessage }));
    setNickName("");
  };

  window.addEventListener("mousedown", (e) => {
    if (open && e.target.className === "openModal modal") {
      close();
    }
  });

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <input
              type="text"
              name="inputText"
              onChange={onGetNickName}
              placeholder="초대할 회원 닉네임을 입력해주세요 :)"
            />
            <div>{message}</div>
          </main>
          <footer>
            <button className="addMember" onClick={onAddMember}>
              초대하기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default MemberAddModal;
