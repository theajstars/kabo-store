import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastProvider } from "react-toast-notifications";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <ToastProvider autoDismiss={true}>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
