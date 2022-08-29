import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import StartPage from "../pages/StartPage";
import LoginPage from "../pages/LoginPage"
import JoinPage from "../pages/JoinPage"
import MyProfilePage from "../pages/MyProfilePage"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/myprofile" element={<MyProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;