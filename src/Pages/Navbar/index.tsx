import React, { useState, useEffect, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import Logo from "../../Assets/IMG/Logo.png";

import "./styles.scss";
import { AppContext } from "../DashboardContainer";
import { RouteList } from "../../Lib/Routelist";

export default function Navbar() {
  const navigate = useNavigate();
  const userContext = useContext(AppContext);

  return (
    <div className="navbar-container flex-row align-center width-100 justify-between">
      <div className="items flex-row align-center">
        <Link to="/dashboard">
          <img src={Logo} alt="" />
        </Link>
        {RouteList.map((route) => {
          return (
            <Link
              className="item text-blue-default"
              to={`/dashboard/${route.route}`}
            >
              {route.label}
            </Link>
          );
        })}
      </div>
      <span
        className="flex-row align-center text-blue-default pointer"
        onClick={() => {
          userContext?.logout();
        }}
      >
        Logout &nbsp; <i className="fal fa-sign-out" />
      </span>
    </div>
  );
}
