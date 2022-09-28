import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeletePost, toOpenPublic } from "../../redux/modules/MainSlice";
import styled from "styled-components";
import { toast } from "react-toastify";

const PublicModal = ({ pModal, setPModal, openPublic, id }) => {
  const dispatch = useDispatch();

  const close = () => {
    setPModal(false);
  };

  const onToPublic = () => {
    dispatch(toOpenPublic({ id, value: openPublic }));
  };

  const clickOutside = () => {
    window.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      if (pModal && e.target.id === "out") {
        close();
      }
    });
  };

  return pModal ? (
    <ModalBack id="out" onClick={clickOutside}>
      <ModalBox>
        <HeaderBox>
          {openPublic ? (
            <div>공개를 취소하시겠습니까?</div>
          ) : (
            <div>공개하시겠습니까?</div>
          )}
          <ExitBtn onClick={close}>&times;</ExitBtn>
        </HeaderBox>
        <AnswerBox>
          {openPublic ? (
            <Answer style={{ backgroundColor: "#8ae084" }} onClick={onToPublic}>
              공개취소
            </Answer>
          ) : (
            <Answer style={{ backgroundColor: "#9AB9FF" }} onClick={onToPublic}>
              공개하기
            </Answer>
          )}
          <Answer style={{ backgroundColor: "#ff6e6e" }} onClick={close}>
            나가기
          </Answer>
        </AnswerBox>
      </ModalBox>
    </ModalBack>
  ) : null;
};

const DeleteModal = ({ dModal, setDModal, id }) => {
  const dispatch = useDispatch();

  const close = () => {
    setDModal(false);
  };

  const onDelete = () => {
    dispatch(DeletePost(id));
  };

  const clickOutside = () => {
    window.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      if (dModal && e.target.id === "out") {
        close();
      }
    });
  };

  return dModal ? (
    <ModalBack id="out" onClick={clickOutside}>
      <ModalBox>
        <HeaderBox>
          삭제하시겠습니까?
          <ExitBtn onClick={close}>&times;</ExitBtn>
        </HeaderBox>
        <AnswerBox>
          <Answer style={{ backgroundColor: "#9AB9FF" }} onClick={onDelete}>
            삭제하기
          </Answer>
          <Answer style={{ backgroundColor: "#ff6e6e" }} onClick={close}>
            나가기
          </Answer>
        </AnswerBox>
      </ModalBox>
    </ModalBack>
  ) : null;
};

const ModalBack = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  animation: modal-bg-show 0.3s;
  @media only screen and (max-width: 430px) {
    position: absolute;
    top: auto;
  }
`;

const ModalBox = styled.div`
  width: 90%;
  max-width: 300px;
  height: 13%;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  animation: modal-show 0.3s;
  overflow: hidden;
`;

const HeaderBox = styled.header`
  position: relative;
  padding: 8px 32px 8px 8px;
  background-color: #f1f1f1;
  font-weight: 700;
`;

const ExitBtn = styled.button`
  position: absolute;
  top: 0px;
  right: 5px;
  width: 30px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  color: #999;
  background-color: transparent;
  border: 0px;
`;

const AnswerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Answer = styled.div`
  margin-top: 7%;
  padding: 2%;
  border: 1px solid transparent;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  cursor: pointer;
`;

const PublicDeleteBtn = (props) => {
  const openPublic = useSelector((state) => state.kakaoMap?.openPublic);
  const members = useSelector((state) => state.kakaoMap?.members);

  const nickname = localStorage.getItem("nickname");

  const [pModal, setPModal] = useState(false);
  const [dModal, setDModal] = useState(false);

  const onToPublic = () => {
    if (members?.includes(nickname)) {
      setPModal(!pModal);
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
      setDModal(!dModal);
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
      {members?.includes(nickname) ? (
        <TwoBox>
          {openPublic ? (
            <Pbtn
              public={false}
              onClick={() => {
                onToPublic();
              }}
            >
              공개취소
            </Pbtn>
          ) : (
            <Pbtn
              public={true}
              onClick={() => {
                onToPublic();
              }}
            >
              공개하기
            </Pbtn>
          )}
          <Dbtn
            onClick={() => {
              onDelete();
            }}
          >
            삭제
          </Dbtn>
        </TwoBox>
      ) : null}
      <PublicModal
        pModal={pModal}
        setPModal={setPModal}
        openPublic={openPublic}
        id={props.postId}
      />
      <DeleteModal dModal={dModal} setDModal={setDModal} id={props.postId} />
    </>
  );
};

const TwoBox = styled.div`
  display: flex;
  position: fixed;
  right: 0%;
  top: 7.7%;
  z-index: 4;
  width: 13%;
  @media only screen and (max-width: 430px) {
    position: absolute;
    top: auto;
    width: 39%;
  }
`;

const Pbtn = styled.div`
  background-color: ${(props) => (props.public ? "#9AB9FF;" : "#8ae084")};
  border: ${(props) =>
    props.public ? "1px solid #9AB9FF;" : "1px solid #8ae084"};
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
