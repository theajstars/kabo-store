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

import { Store, User } from "../../Lib/Types";

import "./styles.scss";
import { PerformRequest } from "../../Lib/PerformRequest";
import { Endpoints } from "../../Lib/Endpoints";
import { GetUserStoreResponse, LoginResponse } from "../../Lib/Responses";
import MegaLoader from "../../Misc/MegaLoader";
import Products from "../Products";
import Dashboard from "../Dashboard";
import Navbar from "../Navbar";
import NewProduct from "../NewProduct";
import Orders from "../Orders";
import Team from "../Team";
import Profile from "../Profile";

interface AppContextProps {
  user: User | null;
  store: Store | null;
  logout: () => void;
  getUser: () => void;
}
const AppContext = createContext<AppContextProps | null>(null);
export default function DashboardContainer() {
  const navigate = useNavigate();
  const { addToast, removeAllToasts } = useToasts();
  const [user, setUser] = useState<User | null>(null);
  const [userStore, setUserStore] = useState<Store | null>(null);

  const getUser = async () => {
    const token = Cookies.get("token");
    const storeID = Cookies.get("user_store_id");
    if (!storeID || !token) {
      navigate("/login");
    } else {
      const r: LoginResponse = await PerformRequest({
        route: Endpoints.GetUserDetails,
        method: "POST",
        data: { token: token },
      });
      console.log(r);
      if (r.data && r.data.data) {
        setUser(r.data.data);
      } else {
        navigate("/login");
      }
    }
  };
  const getUserStore = async () => {
    const token = Cookies.get("token");
    const r: GetUserStoreResponse = await PerformRequest({
      method: "POST",
      route: Endpoints.GetUserStore,
      data: { token, store_id: Cookies.get("user_store_id") },
    });
    console.log(r);

    if (r.data && r.data.data) {
      if (r.data.status === "success") {
        setUserStore(r.data.data);
      }
    }
  };
  useEffect(() => {
    getUser();
    getUserStore();
  }, []);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user_store_id");
    navigate("/login");
  };
  return (
    <AppContext.Provider
      value={{ user: user, logout: logout, store: userStore, getUser: getUser }}
    >
      <Navbar />
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/team" element={<Team />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-product" element={<NewProduct />} />
      </Routes>
    </AppContext.Provider>
  );
}
export { AppContext };
