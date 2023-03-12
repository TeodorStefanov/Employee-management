import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEmployeePage from "./pages/createEmployeePage";
import CreateTaskPage from "./pages/createTaskPage";
import EditTaskPage from "./pages/editTaskPage";
import ErrorPage from "./pages/error";
import HomePage from "./pages/homePage";
import TaskPage from "./pages/taskPage";
const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createEmployee" element={<CreateEmployeePage />} />
        <Route path="/createTask" element={<CreateTaskPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/tasks/:id" element={<TaskPage />} />
        <Route path="/task/edit/:id" element={<EditTaskPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Navigation;
