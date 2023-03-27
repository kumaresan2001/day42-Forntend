import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Spinner from "react-bootstrap/Spinner";

import { API_URL } from "../../App";
import IntroNavBar from "./IntroNavBar";
import { Tooltip } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [status, setStatus] = useState("primary");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const navigate = useNavigate();

  const togglePw = () => setShowPw(!showPw);

  let handleSubmit = async () => {
    // console.log(email, password);
    setLoading(true);
    let res = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });
    if (res.data.statusCode === 200) {
      window.sessionStorage.setItem("token", res.data.token);
      window.sessionStorage.setItem("role", res.data.role);
      window.sessionStorage.setItem("userId", res.data.userId);
      window.sessionStorage.setItem("userName", res.data.name);
      if (res.data.role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } else {
      setMessage(res.data.message);
      setStatus("error");
      setSubmitBtn("Retry");
    }
    setLoading(false);
  };

  return (
    <>
      <IntroNavBar />
      <div className="mt-5 d-flex">
        <form className="shadow-form container d-grid gap-4 col-md-6 col-lg-3 pt-5 px-5 mt-5">
          <h2 className="text-center">Login</h2>
          <TextField
            type="text"
            name="email"
            label="Email"
            variant="outlined"
            value={email}
            shrink
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type={showPw ? "text" : "password"}
            name="password"
            label="Password"
            variant="outlined"
            value={password}
            shrink
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePw}
                    edge="end"
                  >
                    {showPw ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            color={status}
            variant="contained"
            onClick={() => handleSubmit()}
          >
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              submitBtn
            )}
          </Button>
          <div className="d-flex justify-content-between">
            <Tooltip title="Prefill user demo credentials">
              <Button
                color="info"
                variant="outlined"
                onClick={() => {
                  setEmail("kumar@gmail.com");
                  setPassword("kumar@123");
                }}
              >
                User
              </Button>
            </Tooltip>

            <Tooltip title="Prefill admin demo credentials">
              <Button
                color="info"
                variant="outlined"
                onClick={() => {
                  setEmail("admin@gmail.com");
                  setPassword("admin@123");
                }}
              >
                Admin
              </Button>
            </Tooltip>
          </div>

          <div className="d-flex justify-content-end">
            <Link to="/signup">Not Registered??</Link>
          </div>
          <span className="mt-0 mb-4">
            {message ? (
              <div className="text-danger text-center">{message}</div>
            ) : (
              <></>
            )}
          </span>
        </form>
      </div>
    </>
  );
}
