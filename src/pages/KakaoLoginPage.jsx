import React from "react";
import NoHeaderLayout from "../components/common/NoHeaderLayout";
import KakaoLogIn from "../components/signup/KakaoLogIn"

const KakaoLoginPage = () => {
  return (
    <NoHeaderLayout>
      <KakaoLogIn />
    </NoHeaderLayout>
  );
};

export default KakaoLoginPage;
