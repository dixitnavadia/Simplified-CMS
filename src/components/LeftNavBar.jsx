// import * as React from "react";
// import "../styles/NewPage.css";

// const LeftNavBar = () => {
//   return (
//     <>
//       <aside className="sidebar">
//         <h1>CMS</h1>
//         <nav>
//           <ul>
//             <li className="nav-bar-item">Dashboard</li>
//             <li className="nav-bar-item">Product Pages</li>
//             <li className="nav-bar-item">Media Library</li>
//             <li className="nav-bar-item">Settings</li>
//           </ul>
//         </nav>
//         <button className="new-page-btn">+ New Page</button>
//       </aside>
//     </>
//   );
// };
// export default LeftNavBar;

// Umbau mit MUI

import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";

const navItems = ["Dashboard", "Product Pages", "Media Library", "Settings"];

const LeftNavBar = () => {
  return (
    <Paper
      elevation={8}
      sx={{
        background: "#232323",
        color: "#fff",
        borderRadius: "20px",
        margin: "36px 0 36px 36px",
        padding: "40px 28px",
        minHeight: "90vh",
        width: "240px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 6px 32px rgba(0,0,0,0.22)",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 5, letterSpacing: 2 }}
      >
        CMS
      </Typography>
      <nav style={{ width: "100%" }}>
        <List sx={{ width: "100%" }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item}
              sx={{
                color: "#fff",
                fontWeight: 500,
                fontSize: "1.5rem",
                px: 2,
                py: 1.5,
                borderRadius: "10px",
                mb: 1,
                "&:hover": { background: "#181818", color: "#90caf9" },
                transition: "background 0.2s, color 0.2s",
              }}
            >
              {item}
            </ListItemButton>
          ))}
        </List>
      </nav>
      <Button
        variant="contained"
        sx={{
          mt: "auto",
          bgcolor: "#1976d2",
          color: "#fff",
          borderRadius: "10px",
          fontWeight: 600,
          px: 2,
          py: 1.5,
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          letterSpacing: 1,
          fontSize: "1rem",
          "&:hover": { bgcolor: "#1565c0" },
        }}
        fullWidth
      >
        + New Page
      </Button>
    </Paper>
  );
};

export default LeftNavBar;
