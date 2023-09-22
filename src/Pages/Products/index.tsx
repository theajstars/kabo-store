import React, { useState, useEffect, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useToasts } from "react-toast-notifications";
import Cookies from "js-cookie";

import { User } from "../../Lib/Types";

import ProductsIcon from "../../Assets/IMG/ProductsIconDark.svg";
import OrdersIcon from "../../Assets/IMG/OrdersIconDark.svg";

import Logo from "../../Assets/IMG/Logo.png";

import "./styles.scss";
import { PerformRequest } from "../../Lib/PerformRequest";
import { Endpoints } from "../../Lib/Endpoints";
import { LoginResponse } from "../../Lib/Responses";
import MegaLoader from "../../Misc/MegaLoader";
import { AppContext } from "../DashboardContainer";

export default function Products() {
  const navigate = useNavigate();
  const userContext = useContext(AppContext);
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
    <div className="products-container flex-col width-100">
      {userContext ? <div className="table"></div> : <MegaLoader />}
    </div>
  );
}
