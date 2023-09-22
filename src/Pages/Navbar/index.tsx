import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  CardContent,
  Typography,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
} from "@mui/material";
import Cookies from "js-cookie";
import { useToasts } from "react-toast-notifications";
import { appConfig } from "../../Lib/appConfig";

import { PerformRequest } from "../../Lib/PerformRequest";
import { Endpoints } from "../../Lib/Endpoints";
import { LoginResponse } from "../../Lib/Responses";
import { validateEmail } from "../../Lib/Methods";
import ProgressCircle from "../../Misc/ProgressCircle";

import Logo from "../../Assets/IMG/Logo.png";

import "./styles.scss";
interface FormValues {
  email: string;
  password: string;
  showPassword: boolean;
}
export default function Navbar() {
  const navigate = useNavigate();
  const { addToast, removeAllToasts } = useToasts();

  return (
    <div className="navbar-container flex-row width-100">
      <div className="items flex-row align-center">
        <Link to="/dashboard">
          <img src={Logo} alt="" />
        </Link>
        <Link className="item text-blue-default" to="/dashboard/products">
          Products
        </Link>
        <Link className="item text-blue-default" to="/dashboard/orders">
          Orders
        </Link>
      </div>
    </div>
  );
}
