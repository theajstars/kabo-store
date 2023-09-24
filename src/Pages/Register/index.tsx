import React, { useState } from "react";

import { Link } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  Button,
  CircularProgress,
  FormControlLabel,
  Divider,
} from "@mui/material";

import { appConfig } from "../../Lib/appConfig";
import Logo from "../../Assets/IMG/Logo.png";

import "./styles.scss";
import { LoginResponse } from "../../Lib/Responses";

export default function Register() {
  interface UserFormValuesProps {
    email: string;
    password: string;
    showPassword: boolean;
  }
  interface StoreFormValuesProps {
    name: string;
    email: string;
    phone: string;
  }
  const [isLoading, setLoading] = useState<boolean>(false);
  const [userFormValues, setUserFormValues] = useState<UserFormValuesProps>({
    email: "",
    password: "",
    showPassword: false,
  });
  const [storeFormValues, setStoreFormValues] = useState<StoreFormValuesProps>({
    name: "",
    phone: "",
    email: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="register-container flex-row width-100">
      <div className="content">
        <CardContent>
          <div className="flex-row align-center justify-center width-100">
            <img src={Logo} alt="" className="logo" />
          </div>

          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <span className="text-dark px-19 fw-600">Store Information</span>
            <br />
            <br />
            <TextField
              autoFocus
              fullWidth
              label="Name"
              sx={{ marginBottom: 4 }}
              value={storeFormValues.name}
              onChange={(e) =>
                setStoreFormValues({ ...storeFormValues, name: e.target.value })
              }
            />
            <TextField
              autoFocus
              fullWidth
              label="Phone Number"
              sx={{ marginBottom: 4 }}
              value={storeFormValues.phone}
              onChange={(e) =>
                setStoreFormValues({
                  ...storeFormValues,
                  phone: e.target.value,
                })
              }
            />
            <TextField
              autoFocus
              fullWidth
              label="Email"
              sx={{ marginBottom: 4 }}
              value={storeFormValues.email}
              onChange={(e) =>
                setStoreFormValues({
                  ...storeFormValues,
                  email: e.target.value,
                })
              }
            />
            <Divider />
            <br />
            <span className="text-dark px-19 fw-600">User Information</span>
            <br />
            <br />

            <TextField
              autoFocus
              fullWidth
              label="Email"
              type={"email"}
              sx={{ marginBottom: 4 }}
              value={userFormValues.email}
              onChange={(e) =>
                setUserFormValues({ ...userFormValues, email: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-login-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                value={userFormValues.password}
                onChange={(e) =>
                  setUserFormValues({
                    ...userFormValues,
                    password: e.target.value,
                  })
                }
                type={userFormValues.showPassword ? "text" : "password"}
              />
            </FormControl>
            <br />
            <br />
            <Button fullWidth size="large" variant="contained" type="submit">
              {isLoading ? <CircularProgress color="inherit" /> : "Login"}
            </Button>
          </form>
          <br />
          <div className="flex-row align-center justify-between">
            <span className="px-14">Don't have an account?</span>
            <Link className="text-blue-default" to="/register">
              Create an account
            </Link>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
