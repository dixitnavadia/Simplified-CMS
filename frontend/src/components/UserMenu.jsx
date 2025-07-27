import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const UserMenu = ({ handleLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { user, loading, clearUser } = useUser();

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogoutClick = () => {
    clearUser(); // Clear user context
    handleLogout(); // Call parent logout handler
    navigate("/login");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  // Get role color
  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return '#f44336';
      case 'editor': return '#ff9800';
      case 'guest': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  const open = Boolean(anchorEl);

  // Show loading state
  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: -15,
          marginLeft: "auto",
          marginBottom: "25px",
          "@media (max-width:700px)": { display: "none" },
        }}
      >
        <CircularProgress size={40} sx={{ color: "#90caf9" }} />
      </Box>
    );
  }

  // Show default if no user data
  if (!user) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: -15,
          marginLeft: "auto",
          marginBottom: "25px",
          "@media (max-width:700px)": { display: "none" },
        }}
      >
        <Avatar
          sx={{ bgcolor: "slategray", cursor: "pointer" }}
          onClick={handleIconClick}
        >
          U
        </Avatar>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Box sx={{ p: 2, minWidth: 200 }}>
            <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
              User data not available
            </Typography>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2, width: "100%" }}
              onClick={handleLogoutClick}
            >
              Log Out
            </Button>
          </Box>
        </Popover>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: -15,
        marginLeft: "auto",
        marginBottom: "25px",
        "@media (max-width:700px)": { display: "none" },
      }}
    >
      <Avatar
        sx={{ 
          bgcolor: getRoleColor(user.role), 
          cursor: "pointer",
          border: "2px solid #333"
        }}
        onClick={handleIconClick}
      >
        {getUserInitials(user.fullname)}
      </Avatar>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        PaperProps={{
          sx: {
            bgcolor: "#232323",
            color: "#fff",
            border: "1px solid #444"
          }
        }}
      >
        <Box sx={{ p: 3, minWidth: 250 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {user.fullname}
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa", mb: 2 }}>
            {user.email}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Chip
              label={user.role?.toUpperCase() || 'GUEST'}
              size="small"
              sx={{
                bgcolor: getRoleColor(user.role),
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.75rem"
              }}
            />
          </Box>

          <Typography variant="caption" sx={{ color: "#666", mb: 2, display: "block" }}>
            User ID: {user.id}
          </Typography>
          
          <Button
            variant="contained"
            color="error"
            sx={{ 
              mt: 2, 
              width: "100%",
              bgcolor: "#f44336",
              "&:hover": { bgcolor: "#d32f2f" }
            }}
            onClick={handleLogoutClick}
          >
            Log Out
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default UserMenu;
