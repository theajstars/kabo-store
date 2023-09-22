import React, { useState, useEffect, createContext } from "react";

import {
  useNavigate,
  Link,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { useToasts } from "react-toast-notifications";
import Cookies from "js-cookie";

import { User } from "../../Lib/Types";

import "./styles.scss";
import { PerformRequest } from "../../Lib/PerformRequest";
import { Endpoints } from "../../Lib/Endpoints";
import { LoginResponse } from "../../Lib/Responses";
import MegaLoader from "../../Misc/MegaLoader";
import Products from "../Products";
import Dashboard from "../Dashboard";
import Navbar from "../Navbar";
import NewProduct from "../NewProduct";

const AppContext = createContext<User | null>(null);
export default function DashboardContainer() {
  const navigate = useNavigate();
  const { addToast, removeAllToasts } = useToasts();
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const token = Cookies.get("token");
    const r: LoginResponse = await PerformRequest({
      route: Endpoints.GetUserDetails,
      method: "POST",
      data: { token: token },
    });
    if (r.data && r.data.data) {
      setUser(r.data.data);
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <AppContext.Provider value={user}>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/new-product" element={<NewProduct />} />
      </Routes>
    </AppContext.Provider>
  );
}
export { AppContext };
