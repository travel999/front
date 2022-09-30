import React from "react";
import "../../detailSchedule/modal/MemberAddModal.css";

const DescriptModal = (props) => {

    const { open, close } = props;
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
                    <header>✈️ 우리가치 여행 일정 생성 설명 ✈️</header> 
                    <div className="scheduleDesc">
                        1. 여행일정을 지정하고, 여행의 제목을 입력해주세요. <br/>
                        2. 일정 생성 버튼을 누르면 여행 일정이 생성됩니다. <br/>
                        3. 장소 선택을 눌러 가고 싶은 장소를 선택해주세요. <br/>
                        4. 필요하다면 일정 내용을 작성하고 <b>내용 저장 버튼</b>을 눌러주세요. <br/>
                        5. 1일차 여행 계획을 다 짜셨다면 <b>전체 일정 저장 버튼</b>을 <b>꼭</b> 눌러주세요. <br/>
                        6. 마지막 일차까지 일정을 짜고 나면 여행 계획 완성입니다! <br/>
                        ✨ 오른쪽 공개하기 버튼을 눌러 나의 일정을 공개할 수 있어요. <br/>
                        ✨ 일정을 삭제하고 싶을 때는 삭제하기 버튼을 이용해주세요.</div>
                </section>  
            ) : null}
        </div>
    );
};

export default DescriptModal;