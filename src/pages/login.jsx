// import React from 'react';
// import '../styles/Authenticate.css';

// const Login = () => {
//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2 className="auth-title">Login</h2>

//         <form className="auth-form">
//           <input type="email" placeholder="Max@Mustermann.com" className="auth-input" />

//           <div className="password-wrapper">
//             <input type="password" placeholder="••••••••" className="auth-input forgot-link" />
//             <a href="#" className="forgot-password-link">Forgot Password?</a>
//           </div>

//           <button type="submit" className="auth-button">Login</button>
//         </form>

//         <p className="auth-footer-text">
//           Don’t have an account? <a href="#">Register</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

// Umbau mit MUI

import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const Login = () => {
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
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            autoComplete="email"
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "#fff", background: "#181818" },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            autoComplete="current-password"
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "#fff", background: "#181818" },
            }}
          />
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
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, color: "#bbb" }}>
          Don’t have an account?{" "}
          <Link href="#" underline="hover" sx={{ color: "#90caf9" }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
