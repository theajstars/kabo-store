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
} from "@mui/material";

import { appConfig } from "../../Lib/appConfig";
import Logo from "../../Assets/IMG/Logo.png";

import "./styles.scss";
import { LoginResponse } from "../../Lib/Responses";

export default function Register() {
  interface FormValues {
    email: string;
    password: string;
    showPassword: boolean;
  }
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
    showPassword: false,
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="register-container flex-row width-100">
      <div className="content">
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={Logo} alt="" className="logo" />
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}
            >
              Welcome to {appConfig.appName}!
            </Typography>
            <Typography variant="body2">
              Please sign-in to your account and start the adventure
            </Typography>
          </Box>

          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              id="email"
              label="Email"
              type={"email"}
              sx={{ marginBottom: 4 }}
              value={formValues.email}
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-login-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                value={formValues.password}
                id="auth-login-password"
                onChange={(e) =>
                  setFormValues({ ...formValues, password: e.target.value })
                }
                type={formValues.showPassword ? "text" : "password"}
              />
            </FormControl>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel control={<Checkbox />} label="Remember Me" />
            </Box>

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
