import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { DeletePost, toOpenPublic } from "../../redux/modules/MainSlice";

const PublicDeleteBtn = (props) => {
  const dispatch = useDispatch();
  const openPublic = useSelector((state) => state.kakaoMap?.openPublic);
  const members = useSelector((state) => state.kakaoMap?.members);
  const nickname = localStorage.getItem("nickname");

  const onToPublic = () => {
    if (members?.includes(nickname)) {
      if (openPublic) {
        const getConfirm = window.confirm("게시글 공개를 취소하시겠습니까?");
        if (getConfirm) {
          dispatch(toOpenPublic({ id: props.postId, value: openPublic }));
        }
      } else {
        const getConfirm = window.confirm("게시글을 공개하시겠습니까?");
        if (getConfirm) {
          dispatch(toOpenPublic({ id: props.postId, value: openPublic }));
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
      {openPublic ? (
        <div style={{ float: "right", display: "flex" }}>
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
        </div>
      ) : (
        <div style={{ float: "right", display: "flex" }}>
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
        </div>
      )}
    </>
  );
};

const Pbtn = styled.div`
  background-color: ${(props) => (props.public ? "#9AB9FF;;" : "#8ae084")};
  border: ${(props) =>
    props.public ? "1px solid #a1ff9a;;" : "1px solid #8ae084"};
  color: ${(props) => (props.public ? "white" : "white")};
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;
  margin-top: 3px;
  padding: 3px 5px;
  border-radius: 6px;
`;

const Dbtn = styled.div`
  background-color: #ff6e6e;
  color: #ffffff;
  border: 1px solid #ff6e6e;
  margin-right: 20px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 3px;
  padding: 3px 5px;
  border-radius: 6px;
`;

export default PublicDeleteBtn;
