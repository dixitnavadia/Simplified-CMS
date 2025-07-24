import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const [equal, setEqual] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const formRef = useRef();
  const navigate = useNavigate();

  const checkPassword = (e) => {
    const form = formRef.current;
    const confirmValue = e.target.value;
    setConfirmPasswordValue(confirmValue);

    if (!confirmValue) {
      setEqual(false);
      return;
    }
    form.password.value === form.confirmPassword.value
      ? setEqual(true)
      : setEqual(false);
    if (!form.confirmPassword.value) {
      setEqual(false);
    }
  };

  const getConfirmPasswordLabel = () => {
    if (!confirmPasswordValue) {
      return "RE-type Password";
    }
    return equal ? "Password confirmed" : "Password does not match";
  };

  const getConfirmPasswordLabelColor = () => {
    if (!confirmPasswordValue) {
      return "#bbb"; // default color
    }
    return equal ? "#4caf50" : "#f44336"; // green for match, red for no match
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = {
      id: uuidv4(),
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
      role: "guest",
    };
    const config = {
      url: "http://localhost:3000/api/register",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formData),
    };
    const resp = await axios(config);
    console.log(resp.data);
    //navigier to login page after successful registration
    if (resp.status === 201) {
      navigate("/login");
    }
  };

  return (
    <Box
      className="auth-container"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#181818",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          minWidth: 320,
          maxWidth: 400,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#232323",
          color: "#fff",
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 2, color: "#fff" }}>
          Register
        </Typography>
        <Box
          component="form"
          className="auth-form"
          ref={formRef}
          onSubmit={(e) => registerUser(e)}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            required
            label="Full Name"
            variant="outlined"
            fullWidth
            name="fullname"
            autoComplete="name"
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "#fff", background: "#181818" },
            }}
          />
          <TextField
            required
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            fullWidth
            autoComplete="email"
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "#fff", background: "#181818" },
            }}
          />
          <TextField
          required
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            variant="outlined"
            fullWidth
            autoComplete="new-password"
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "#fff", background: "#181818" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onMouseDownCapture={() => setShowPassword(!showPassword)}
                    onMouseUp={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "#bbb" }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
          required
            label={getConfirmPasswordLabel()}
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            variant="outlined"
            fullWidth
            autoComplete="new-password"
            InputLabelProps={{
              style: {
                color: getConfirmPasswordLabelColor(),
                transition: "color 0.3s ease",
              },
            }}
            InputProps={{
              style: { color: "#fff", background: "#181818" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onMouseDownCapture={() => setShowConfirmPassword(!showConfirmPassword)}
                    onMouseUp={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    sx={{ color: "#bbb" }}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={checkPassword}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!equal || !confirmPasswordValue}
            sx={{
              mt: 1,
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#1565c0" },
              color: "#fff",
            }}
            fullWidth
          >
            Register
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, color: "#bbb" }}>
          Already have an account?{" "}
          <Link
            href="#"
            underline="hover"
            sx={{ color: "#90caf9" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
