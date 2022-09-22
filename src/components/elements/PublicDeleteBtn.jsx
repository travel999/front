import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { DeletePost, toOpenPublic } from "../../redux/modules/MainSlice";

const PublicDeleteBtn = (props) => {
  const dispatch = useDispatch();
  const openPublic = useSelector((state) => state.kakaoMap.openPublic);
  const members = useSelector((state) => state.kakaoMap.members);
  const nickname = localStorage.getItem("nickname");

  const onToPublic = () => {
    if (members?.includes(nickname)) {
      if (openPublic) {
        const getConfirm = window.confirm("게시글 공개를 취소하시겠습니까?");
        if (getConfirm) {
          dispatch(toOpenPublic(props.postId));
        }
      } else {
        const getConfirm = window.confirm("게시글을 공개하시겠습니까?");
        if (getConfirm) {
          dispatch(toOpenPublic(props.postId));
        }
      }
    } else {
      toast.success(`권한이 없습니다.`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onDelete = () => {
    if (members?.includes(nickname)) {
      const getConfirm = window.confirm("삭제하시겠습니까?");
      if (getConfirm) {
        dispatch(DeletePost(props.postId));
      }
    } else {
      toast.success(`권한이 없습니다.`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      {props.open ? (
        <>
          <Pbtn
            public={false}
            onClick={() => {
              onToPublic();
            }}
          >
            공개취소
          </Pbtn>
          <Dbtn
            onClick={() => {
              onDelete();
            }}
          >
            삭제
          </Dbtn>
        </>
      ) : (
        <>
          <Pbtn
            public={true}
            onClick={() => {
              onToPublic();
            }}
          >
            공개하기
          </Pbtn>
          <Dbtn
            onClick={() => {
              onDelete();
            }}
          >
            삭제
          </Dbtn>
        </>
      )}
    </>
  );
};

const Pbtn = styled.button`
  background-color: white;
  border: ${(props) => (props.public ? "1px solid blue" : "1px solid green")};
  color: ${(props) => (props.public ? "blue" : "green")};
  padding: 1px 1px;
  font-weight: 600;
  margin-right: 20px;
  cursor: pointer;
`;

const Dbtn = styled.button`
  padding: 1px 1px;
  background-color: #ffffff;
  color: #ff4343;
  border: 1px solid #ff4343;
  margin-right: 20px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0px;
`;

export default PublicDeleteBtn;
