import React, { useEffect, useRef } from "react";
import "./AdviceModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1 } from "@fortawesome/free-solid-svg-icons";
import { fa2 } from "@fortawesome/free-solid-svg-icons";
import { fa3 } from "@fortawesome/free-solid-svg-icons";
import { fa4 } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AdviceModal = ({ advModal, close }) => {
  // modal 닫기
  window.addEventListener("mousedown", (e) => {
    if (advModal && e.target.className === "advopenModal advmodal") {
      e.stopPropagation();
      close();
    }
  });

  return (
    <div className={advModal ? "advopenModal advmodal" : "advmodal"}>
      {advModal ? (
        <section>
          <header>
            일정 생성하기
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <div>
              <FontAwesomeIcon icon={fa1} /> 연도월일, 제목을 지어준 뒤 일정
              생성을 눌러주세요.
            </div>
            <br />
            <div>
              <FontAwesomeIcon icon={fa2} style={{ marginLeft: "-1px" }} />{" "}
              돋보기를 눌러서 1일차 장소를 검색후 선택해 주세요.
            </div>
            <br />
            <div>
              <FontAwesomeIcon icon={fa3} style={{ marginLeft: "-3px" }} />{" "}
              목적지 일정을 작성 후 일정 저장 버튼을 눌러주세요.
            </div>
            <br />
            <div>
              <FontAwesomeIcon icon={fa4} style={{ marginLeft: "-3px" }} />{" "}
              일차를 모두 작성되었다면 전체 일정 저장버튼을 눌러주세요.
            </div>
          </main>
          <footer>
            <div className="plusAdvice">
              <FontAwesomeIcon icon={faPlus} style={{ fontSize: "0.8em" }} />{" "}
              일행이 있다면 닉네임으로 초대 해주세요.
            </div>
            <br />
            <div className="plusAdvice">
              <FontAwesomeIcon icon={faPlus} style={{ fontSize: "0.8em" }} />{" "}
              일정 작성을 완료했다면 공개하기를 눌러 다른사람에게 공유해보세요.
            </div>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default AdviceModal;
