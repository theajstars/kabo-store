import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastProvider } from "react-toast-notifications";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Products from "./Pages/Products";
import DashboardContainer from "./Pages/DashboardContainer";
import NewProduct from "./Pages/NewProduct";
import Orders from "./Pages/Orders";
import Team from "./Pages/Team";
import Profile from "./Pages/Profile";
import ResetPassword from "./Pages/ResetPassword";
import Error404 from "./Pages/Error404";

function App() {
  return (
    <ToastProvider autoDismiss={true}>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/dashboard" element={<DashboardContainer />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route path="/dashboard/team" element={<Team />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/new-product" element={<NewProduct />} />
          </Route>
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
