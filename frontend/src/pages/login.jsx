import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"

const Login = ({handleLogin}) => {
     const [fieldType,setFieldType] = useState(true);
    const navigator = useNavigate();
    const valueEmail = useRef();
    const valuePassword = useRef();

    const handleClick = async() => {
        // console.log(valueEmail.current.value);
        // console.log(valuePassword.current.value);
        const data = {
            email: valueEmail.current.value,
            password: valuePassword.current.value
        };
      
        const config = {
            url: "http://localhost:3000/api/login",
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            data: data
        }
        try {
            console.log(config);
            const response = await axios(config);
            console.log(response.data);
            
            localStorage.setItem("token",response.data.token);
            handleLogin();
            navigator("/NewPage");

        } catch(e) {
            console.log(e);
        }
    }

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
          Login
        </Typography>
        <Box
          component="form"
          className="auth-form"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
          required
          inputRef={valueEmail}
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            autoComplete="email"
            name="email"
            
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "#fff", background: "#181818" },
            }}
          />
          <TextField
            required
            inputRef={valuePassword}
            label="Password"
            type={fieldType ? "password" : "text"}
            variant="outlined"
            fullWidth
            autoComplete="current-password"
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "#fff", background: "#181818" },
            }}
          /><VisibilityIcon onClick={() => setFieldType(!fieldType)}/>
          
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
              href="#"
              underline="hover"
              sx={{ color: "#90caf9", fontSize: 14 }}
            >
              Forgot Password?
            </Link>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 1,
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#1565c0" },
              color: "#fff",
            }}
            fullWidth
            onClick={(e)=> {
              e.preventDefault();
              handleClick()}}
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, color: "#bbb" }}>
          Don’t have an account?{" "}
          <Link href="#" underline="hover" sx={{ color: "#90caf9" }} onClick={() => navigator("/register")}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
