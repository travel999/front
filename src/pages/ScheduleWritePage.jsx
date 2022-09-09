import React from "react";
import Layout from "../components/common/Layout";
import ScheduleDay from "../components/schedule/ScheduleDay";
import ScheduleList from "../components/schedule/SchduleList";
import ScheduleCreate from "../components/schedule/ScheduleCreate";

const SceduleWritePage = () => {
  return (
    <Layout>
      <ScheduleCreate />
    </Layout>
  );
};

export default SceduleWritePage;
