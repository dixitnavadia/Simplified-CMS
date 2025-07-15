import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const Register = () => {
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
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            autoComplete="name"
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "#fff", background: "#181818" },
            }}
          />
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
            autoComplete="new-password"
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "#fff", background: "#181818" },
            }}
          />
          <TextField
            label="Re-type Password"
            type="password"
            variant="outlined"
            fullWidth
            autoComplete="new-password"
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "#fff", background: "#181818" },
            }}
          />
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
            Register
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, color: "#bbb" }}>
          Already have an account?{" "}
          <Link href="#" underline="hover" sx={{ color: "#90caf9" }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
