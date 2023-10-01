import React, { useState, useEffect, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useToasts } from "react-toast-notifications";
import Cookies from "js-cookie";
import { Container, TextField, TextFieldProps } from "@mui/material";

import { Product, User } from "../../Lib/Types";

import ProductsIcon from "../../Assets/IMG/ProductsIconDark.svg";
import OrdersIcon from "../../Assets/IMG/OrdersIconDark.svg";

import Logo from "../../Assets/IMG/Logo.png";

import "./styles.scss";
import { PerformRequest } from "../../Lib/PerformRequest";
import { Endpoints } from "../../Lib/Endpoints";
import { GetProductsResponse, LoginResponse } from "../../Lib/Responses";
import MegaLoader from "../../Misc/MegaLoader";
import { AppContext } from "../DashboardContainer";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef, GridColTypeDef } from "@mui/x-data-grid/models";
import { Button } from "@mui/material";
import ProgressCircle from "../../Misc/ProgressCircle";

interface ProfileFormProps {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  logo: string;
}
export default function Profile() {
  const navigate = useNavigate();
  const userContext = useContext(AppContext);
  const { addToast, removeAllToasts } = useToasts();

  const [isLoading, setLoading] = useState<boolean>(false);

  const [profileForm, setProfileForm] = useState<ProfileFormProps>({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    logo: "",
  });
  const SubmitProfile = async () => {
    const token = Cookies.get("token");
    setLoading(true);
    const r: GetProductsResponse = await PerformRequest({
      route: Endpoints.UpdateAccount,
      method: "POST",
      data: {
        token: token,
        store: Cookies.get("user_store_id"),
      },
    }).catch(() => {
      setLoading(false);
    });
    setLoading(false);
    if (userContext) {
      userContext?.getUser();
    }
  };

  const textFieldProps: TextFieldProps = {
    variant: "outlined",
    size: "small",
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setProfileForm({ ...profileForm, name: value });
        break;
      case "address":
        setProfileForm({ ...profileForm, address: value });
        break;
      case "phone":
        setProfileForm({ ...profileForm, phone: value });
        break;
      case "email":
        setProfileForm({ ...profileForm, email: value });
        break;
      case "description":
        setProfileForm({ ...profileForm, description: value });
        break;
    }
    setProfileForm({ ...profileForm, name: value });
  };
  return (
    <Container maxWidth="lg">
      <div className="profile-container flex-col width-100">
        {userContext?.user ? (
          <>
            <div className="top width-100 flex-col">
              <div className="flex-row width-100 align-center justify-between">
                <span className="text-dark fw-500 px-20">
                  Profile Information
                </span>
              </div>
            </div>
            {isLoading ? (
              <ProgressCircle />
            ) : (
              <div className="profile flex-col width-100">
                <div className="flex-row align-center width-10 justify-between profile-row">
                  <TextField
                    name="name"
                    value={profileForm.name}
                    placeholder="Store Name"
                    onChange={handleFormChange}
                    {...textFieldProps}
                    fullWidth
                  />
                </div>
                <div className="flex-row align-center width-10 justify-between profile-row">
                  <TextField
                    name="phone"
                    value={profileForm.phone}
                    placeholder="Phone"
                    onChange={handleFormChange}
                    {...textFieldProps}
                    fullWidth
                  />
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <TextField
                    name="email"
                    value={profileForm.email}
                    placeholder="Email Address"
                    onChange={handleFormChange}
                    {...textFieldProps}
                    fullWidth
                  />
                </div>
                <div className="flex-row align-center width-10 justify-between profile-row">
                  <TextField
                    name="address"
                    value={profileForm.address}
                    placeholder="Store Address"
                    onChange={handleFormChange}
                    {...textFieldProps}
                    fullWidth
                  />
                </div>
                <div className="flex-row align-center width-10 justify-between profile-row">
                  <TextField
                    name="description"
                    value={profileForm.description}
                    placeholder="Description"
                    onChange={handleFormChange}
                    {...textFieldProps}
                    fullWidth
                  />
                </div>
                <br />
                <br />
                <br />
                <Button
                  onClick={(e) => {
                    SubmitProfile();
                  }}
                  sx={{ height: "35px", fontSize: "12px" }}
                  variant="contained"
                  type="button"
                >
                  Submit
                </Button>
              </div>
            )}
          </>
        ) : (
          <MegaLoader />
        )}
      </div>
    </Container>
  );
}
