import React, { useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useToasts } from "react-toast-notifications";
import Cookies from "js-cookie";

import { Store, User } from "../../Lib/Types";

import ProductsIcon from "../../Assets/IMG/ProductsIconDark.svg";
import OrdersIcon from "../../Assets/IMG/OrdersIconDark.svg";

import Logo from "../../Assets/IMG/Logo.png";

import "./styles.scss";
import { PerformRequest } from "../../Lib/PerformRequest";
import { Endpoints } from "../../Lib/Endpoints";
import { GetUserStoreResponse, LoginResponse } from "../../Lib/Responses";
import MegaLoader from "../../Misc/MegaLoader";

export default function Dashboard() {
  const navigate = useNavigate();
  const { addToast, removeAllToasts } = useToasts();
  const [user, setUser] = useState<User | null>(null);
  const [userStore, setUserStore] = useState<Store | null>(null);

  const getUser = async () => {
    const token = Cookies.get("token");
    const r: LoginResponse = await PerformRequest({
      route: Endpoints.GetUserDetails,
      method: "POST",
      data: { token: token },
    });
    if (r.data && r.data.data) {
      setUser(r.data.data);
      const r2: GetUserStoreResponse = await PerformRequest({
        route: Endpoints.GetUserStore,
        method: "POST",
        data: {
          token,
          store_id: Cookies.get("user_store_id"),
        },
      });
      if (r2.data && r2.data.data) {
        if (r2.data.status === "success") {
          setUserStore(r2.data.data);
        }
      }
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="dashboard-container flex-col width-100">
      {user ? (
        <>
          <img src={Logo} alt="" className="logo" />
          <div className="profile flex-row align-center width-100 text-dark">
            <div className="item flex-row align-center">
              <span className="icon px-18 flex-row align-center justify-center">
                <i className="far fa-user" />
              </span>
              <span className="tag px-14">
                {user.lastname} {user.othernames}
              </span>
            </div>
            <div className="item flex-row align-center">
              <span className="icon px-18 flex-row align-center justify-center">
                <i className="far fa-store" />
              </span>
              <span className="tag px-14">{userStore?.name}</span>
            </div>
            {/* <div className="item flex-row align-center">
              <span className="icon px-18 flex-row align-center justify-center">
                <i className="far fa-user-tie" />
              </span>
              <span className="tag px-14">{user.email}</span>
            </div> */}
          </div>
          <div className="menu flex-row align-center">
            <div className="item justify-between flex-col">
              <img src={OrdersIcon} alt="" />
              <div className="details flex-col width-100 align-start">
                <span className="px-19 fw-600 text-dark">Orders</span>
                <span className="px-15 text-dark">
                  View delivered, failed and successful orders
                </span>
                <Link
                  className="flex-row align-center justify-center"
                  to="/dashboard/orders"
                >
                  View
                </Link>
              </div>
            </div>
            <div className="item justify-between flex-col">
              <img src={ProductsIcon} alt="" />
              <div className="details flex-col width-100 align-start">
                <span className="px-19 fw-600 text-dark">Products</span>
                <span className="px-15 text-dark">
                  View catalogue of products
                </span>
                <Link
                  className="flex-row align-center justify-center"
                  to="/dashboard/products"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <MegaLoader />
      )}
    </div>
  );
}
