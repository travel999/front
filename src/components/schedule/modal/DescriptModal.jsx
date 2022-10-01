import React from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./DescriptModal.moduels.css";
import gide1 from "../../../res/img/userGide/gide1.png";
import gide2 from "../../../res/img/userGide/gide2.png";
import gide3 from "../../../res/img/userGide/gide3.png";
import gide4 from "../../../res/img/userGide/gide4.png";
import gide5 from "../../../res/img/userGide/gide5.png";
import gide6 from "../../../res/img/userGide/gide6.png";
import gide7 from "../../../res/img/userGide/gide7.png";

const DescriptModal = (props) => {
  const { open, close } = props;
  window.addEventListener("mousedown", (e) => {
    if (e.target.className === "openModal modal") {
      e.stopPropagation();
      close();
    }
  });

  // let settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: true, // 옆으로 이동하는 화살표 표시 여부
  //   dots: true,
  // };


  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section className="scheduleDecsWrap">
          <header>
            ✈️ 우리가치 여행 일정 생성 설명 ✈️
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <div className="scheduleDesc">
            {/* <Slider {...settings}> */}
            <div>
              <img src={gide1} alt="gide1" />
              <span>
                1. 여행일정 과 제목을 선택 작성 후 생성버튼을 눌러주세요.
              </span>
            </div>
            <div>
              <img src={gide2} alt="gide2" />
              <span>
                2. 일행 초대버튼을 눌러 초대할 회원의 닉네임을 작성 후
                초대버튼을 눌러주세요.
              </span>
            </div>
            <div>
              <img src={gide3} alt="gide3" />
              <span>
                3~4. 장소선택 버튼을 누르 신 후, 여행할 장소를 검색 엔터
                해주세요.
              </span>
            </div>
            <div>
              <span>
                5. 리스트에서 원하는 장소를 확인 후 '선택' 버튼을 눌러주세요.
              </span>
              <img src={gide4} alt="gide4" />
            </div>
            <div>
              <img src={gide5} alt="gide5" />
              <span>6. 장소를 지정하시면 리스트에 일정카드가 생성됩니다.</span>
            </div>
            <div>
              <img src={gide6} alt="gide6" />
              <span>
                7. 일정카드에 메모를 작성하신후 반드시 <b>내용 저장 버튼</b>을
                눌러주세요!
                <br />
                8. 일수를 저장하실때는 반드시 아래의
                <b>전체 일정 저장</b>버튼을 눌러주세요! <br />
                9. 초대된 인원과 이곳에서 채팅을 나눠보세요~
              </span>
            </div>
            <div>
              <img src={gide7} alt="gide7" />
              <span>
                10. 공개하기 버튼을 눌러 나의 일정을 공개하고,
                <br />
                삭제하기 버튼을 눌러 일정을 삭제 할 수 있습니다.
              </span>
            </div>
            {/* </Slider> */}
          </div>
        </section>
      ) : null}
    </div>
  );

};

export default DescriptModal;
