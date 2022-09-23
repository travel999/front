// import React from "react";
// import { useDispatch } from "react-redux";
// import { putPassword } from "../../../redux/modules/ProfileSlice";

// import styles from "./modal.module.css"

// const EditPasswordModal = (props) => {
//     const dispatch = useDispatch();

//     const { open, close, text, passWord, confirm, edit } = props;

//     // 비밀번호 수정
//     const onEditProfile = (e) => {
//         if (passWord === "" || confirm === "") {
//             return alert("비밀번호를 확인해주세요!")
//         } else {
//             dispatch(putPassword(edit))
//         }
//     }

//     return (
//         // 모달이 열릴때 openModal 클래스가 생성된다.
//         <div className={open ? "openModal modal" : "modal"}>
//             {open ? (
//                 <section>
//                     <header>
//                         {text}
//                     </header>
//                     <footer>
//                         <button onClick={onEditProfile} className={styles.onEditProfile}>
//                             예
//                         </button>
//                         <button onClick={close} className="close">
//                             아니오
//                         </button>
//                     </footer>
//                 </section>
//             ) : null}
//         </div>
//     );
// };

// export default EditPasswordModal;
