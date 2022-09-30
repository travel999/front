import React from "react";
import NoHeaderLayout from "../components/common/NoHeaderLayout";
import Join from "../components/signup/Join";
import MobileJoin from "../components/signup/MobileJoin";
import { useMediaQuery } from "react-responsive";

const JoinPage = () => {
  const MobileSize = useMediaQuery({ maxWidth: 430 });

  return (
    <NoHeaderLayout>{MobileSize ? <MobileJoin /> : <Join />}</NoHeaderLayout>
  );
};

export default JoinPage;
