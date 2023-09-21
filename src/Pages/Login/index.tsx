import React, { useState, useEffect } from "react";

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

export default function Login() {
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
    <Box className="content-center">
      <Card sx={{ zIndex: 1 }}>
        <CardContent
          sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}
        >
          <Box
            sx={{
              mb: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/images/logo.png"
              alt=""
              className=""
              style={{
                width: "30%",
              }}
            />
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

            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: 7 }}
              type="submit"
            >
              {isLoading ? <CircularProgress color="inherit" /> : "Login"}
            </Button>
          </form>
          <Link to="/register">
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: 7 }}
              type="submit"
            >
              Register
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
}
