import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SchedulePage from "../pages/ScheduleWritePage";
import StartPage from "../pages/StartPage";
import LoginPage from "../pages/LoginPage";
import LoadingPage from "../pages/LoadingPage";
import JoinPage from "../pages/JoinPage";
import ProfilePage from "../pages/ProfilePage";
import LikedPage from "../pages/LikedPage";
import ScheduleDetailPage from "../pages/ScheduleDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/kakao/callback" element={<LoadingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/write" element={<SchedulePage />} />
        <Route path="/liked" element={<LikedPage />} />
        <Route path="/schedulDetail/:id" element={<ScheduleDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
