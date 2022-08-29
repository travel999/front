import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ScedulePage from "../pages/SceduleWritePage";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/write" element={<ScedulePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
