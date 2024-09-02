import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../page/HomePage/HomePage";
import DetailPage from "../../page/DetailPage/DetailPage";
import ToyForm from "../../page/Form/ToyForm";

const RoutesApps: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/home/:page" element={<HomePage />} />
      <Route path="/toys/detail/:id/:name" element={<DetailPage />} />
      <Route path="/add-toy" element={<ToyForm />} />
    </Routes>
  );
};

export default RoutesApps;
