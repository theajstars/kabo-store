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
    phone: string;
    username: string;
    lastName: string;
    firstName: string;
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
    phone: "",
    username: "",
    lastName: "",
    firstName: "",
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
              fullWidth
              label="Name"
              size="small"
              sx={{ marginBottom: 4 }}
              value={storeFormValues.name}
              onChange={(e) =>
                setStoreFormValues({ ...storeFormValues, name: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Phone Number"
              size="small"
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
              fullWidth
              label="Email"
              size="small"
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
            <div className="flex-row align-center justify-between width-100">
              <TextField
                fullWidth
                size="small"
                label="First Name"
                sx={{ marginBottom: 4 }}
                value={userFormValues.firstName}
                onChange={(e) =>
                  setUserFormValues({
                    ...userFormValues,
                    firstName: e.target.value,
                  })
                }
              />
              &nbsp; &nbsp; &nbsp; &nbsp;
              <TextField
                fullWidth
                label="Last Name"
                size="small"
                sx={{ marginBottom: 4 }}
                value={userFormValues.lastName}
                onChange={(e) =>
                  setUserFormValues({
                    ...userFormValues,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
            <TextField
              fullWidth
              size="small"
              label="Email"
              type={"email"}
              sx={{ marginBottom: 4 }}
              value={userFormValues.email}
              onChange={(e) =>
                setUserFormValues({ ...userFormValues, email: e.target.value })
              }
            />
            <div className="flex-row align-center justify-between width-100">
              <TextField
                fullWidth
                size="small"
                label="Username"
                sx={{ marginBottom: 4 }}
                value={userFormValues.username}
                onChange={(e) =>
                  setUserFormValues({
                    ...userFormValues,
                    username: e.target.value,
                  })
                }
              />
              &nbsp; &nbsp; &nbsp; &nbsp;
              <TextField
                fullWidth
                size="small"
                label="Phone"
                sx={{ marginBottom: 4 }}
                value={userFormValues.phone}
                onChange={(e) =>
                  setUserFormValues({
                    ...userFormValues,
                    phone: e.target.value,
                  })
                }
              />
            </div>
            <TextField
              autoFocus
              fullWidth
              id="password"
              label="password"
              size="small"
              type={userFormValues.showPassword ? "text" : "password"}
              value={userFormValues.password}
              onChange={(e) =>
                setUserFormValues({
                  ...userFormValues,
                  password: e.target.value,
                })
              }
            />

            <br />
            <small
              className="px-12 pointer text-dark"
              onClick={() => {
                setUserFormValues({
                  ...userFormValues,
                  showPassword: !userFormValues.showPassword,
                });
              }}
            >
              {userFormValues.showPassword ? "Hide" : "Show"} Password &nbsp;
              {userFormValues.showPassword ? (
                <i className="far fa-eye-slash" />
              ) : (
                <i className="far fa-eye" />
              )}
            </small>
            <br />
            <br />
            <Button
              fullWidth
              size="large"
              sx={{
                height: "35px",
                fontSize: "15px",
                textTransform: "capitalize",
              }}
              variant="contained"
              type="submit"
            >
              {isLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
          <br />
          <div className="flex-row align-center justify-between">
            <span className="px-14">Already have an account?</span>
            <Link className="text-blue-default" to="/login">
              Login
            </Link>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
