import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEmployeePage from "./pages/createEmployeePage";
import CreateTaskPage from "./pages/createTaskPage";
import HomePage from "./pages/homePage";
const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createEmployee" element={<CreateEmployeePage />} />
        <Route path="/createTask" element={<CreateTaskPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Navigation;
