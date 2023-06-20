import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Spinner from "react-bootstrap/Spinner";
import { API_URL } from "../../App";
import IntroNavBar from "./IntroNavBar";

export default function Signup() {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [status, setStatus] = useState("primary");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  let navigate = useNavigate();

  const togglePw = () => setShowPw(!showPw);

  const handleSubmit = async () => {
    // console.log(role, firstName, lastName, email, password);
    setLoading(true);
    let res = await axios.post(`${API_URL}/users/signup`, {
      role,
      firstName,
      lastName,
      email,
      password,
    });
    // console.log(res);
    if (res.data.statusCode === 200) {
      alert(res.data.message);
      navigate("/");
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
      <form className="shadow-form container d-grid col-md-6 col-lg-4 p-5 gap-4 mt-5">
        <h2 className="text-center"> SignUp</h2>
        <FormControl fullWidth required>
          <InputLabel>Signup as</InputLabel>
          <Select
            name="role"
            value={role}
            label="isAdmin"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"Admin"}>Admin</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="text"
          name="firstName"
          label="firstName"
          variant="outlined"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          type="text"
          name="lastName"
          label="Last Name"
          variant="outlined"
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type={showPw ? "text" : "password"}
          name="password"
          label="Password"
          variant="outlined"
          value={password}
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
          {loading ? <Spinner animation="border" variant="light" /> : submitBtn}
        </Button>
        <div className="d-flex justify-content-end">
          <Link to="/">Already Registered??</Link>
        </div>
        {message ? (
          <div className="text-center text-danger">{message}</div>
        ) : (
          <></>
        )}
      </form>
    </>
  );
}
