import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useToasts } from "react-toast-notifications";

import ProductsIcon from "../../Assets/IMG/ProductsIconDark.svg";
import OrdersIcon from "../../Assets/IMG/OrdersIconDark.svg";

import Logo from "../../Assets/IMG/Logo.png";

import "./styles.scss";

export default function Dashboard() {
  const { addToast, removeAllToasts } = useToasts();

  return (
    <div className="dashboard-container flex-col width-100">
      <img src={Logo} alt="" className="logo" />
      <div className="menu flex-row align-center">
        <div className="item justify-between flex-col">
          <img src={OrdersIcon} alt="" />
          <div className="details flex-col width-100 align-start">
            <span className="px-19 fw-600 text-dark">Orders</span>
            <span className="px-15 text-dark">
              View delivered, failed and successful orders
            </span>
            <button>View</button>
          </div>
        </div>
        <div className="item justify-between flex-col">
          <img src={ProductsIcon} alt="" />
          <div className="details flex-col width-100 align-start">
            <span className="px-19 fw-600 text-dark">Products</span>
            <span className="px-15 text-dark">View catalogue of products</span>
            <button>View</button>
          </div>
        </div>
      </div>
    </div>
  );
}
