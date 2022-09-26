import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../redux/modules/ProfileSlice";
import styles from "./modal.module.css";

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { open, close, text, edit } = props;

  // 회원 탈퇴
  const onDeleteProfile = (e) => {
    dispatch(deleteUser({ navigate, edit }));
    localStorage.removeItem("image");
    localStorage.removeItem("nickname");
  };

  window.addEventListener("mousedown", (e) => {
    if (e.target.className === "openModal modal") {
      e.stopPropagation();
      close();
    }
  });

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <div>
          <div>{text}</div>
          <div>
            <button
              onClick={onDeleteProfile}
              className={styles.onDeleteProfile}
            >
              예
            </button>
            <button onClick={close} className="close">
              아니오
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DeleteModal;
