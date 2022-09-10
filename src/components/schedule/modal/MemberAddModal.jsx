import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./MemberAddModal.css";

import { saveNickName } from "../../../redux/modules/InviteSlice";

const MemberAddModal = (props) => {
  //Hook
  const dispatch = useDispatch();
  //State
  const [nickName, setNickName] = useState("");

  //함수
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, postId } = props;
  //이벤트 함수
  const onGetNickName = (e) => {
    setNickName(e.target.value);
  };
  const onAddMember = () => {
    dispatch(saveNickName({ data: nickName, postId: postId }));
  };

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
            <input type="text" name="nickName" onChange={onGetNickName} />
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
