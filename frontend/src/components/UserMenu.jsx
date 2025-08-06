import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import { useUser } from "../context/UserContext";

const UserMenu = ({ handleLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user, loading } = useUser();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleLogout();
    handleClose();
  };

  // Generate initials from user's full name
  const getInitials = (fullname) => {
    if (!fullname) return "U";
    return fullname
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2); // Take only first 2 initials
  };

  // Generate a consistent color based on the user's name
  const getAvatarColor = (fullname) => {
    if (!fullname) return "#1976d2";
    let hash = 0;
    for (let i = 0; i < fullname.length; i++) {
      hash = fullname.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      "#1976d2",
      "#388e3c",
      "#f57c00",
      "#7b1fa2",
      "#c2185b",
      "#00796b",
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  if (loading) {
    return (
      <Box>
        <Button
          sx={{
            bgcolor: "#232323",
            color: "#fff",
            borderRadius: "8px",
            px: 2,
            py: 1,
            "&:hover": { bgcolor: "#333" },
          }}
          disabled
        >
          Loading...
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{
          bgcolor: "#232323",
          color: "#fff",
          borderRadius: "8px",
          px: 2,
          py: 1,
          "&:hover": { bgcolor: "#333" },
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: getAvatarColor(user?.fullname || "User"),
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {getInitials(user?.fullname || "User")}
        </Avatar>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {user?.fullname || "User"}
          </Typography>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#232323",
            color: "#fff",
            border: "1px solid #333",
            minWidth: 250,
            mt: 1,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* User Info Header */}
        <Box sx={{ p: 2, borderBottom: "1px solid #333" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: getAvatarColor(user?.fullname || "User"),
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {getInitials(user?.fullname || "User")}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {user?.fullname || "User"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#aaa", fontSize: "12px" }}
              >
                {user?.email || "user@example.com"}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#90caf9",
                  fontSize: "11px",
                  textTransform: "capitalize",
                }}
              >
                {user?.role || "user"} Account
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ bgcolor: "#333" }} />

        {/* Menu Items */}
        <MenuItem
          onClick={handleClose}
          sx={{
            "&:hover": { bgcolor: "#333" },
            py: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <PersonIcon sx={{ fontSize: 20, color: "#90caf9" }} />
          <Box>
            <Typography variant="body2">Profile</Typography>
            <Typography variant="caption" sx={{ color: "#aaa" }}>
              Manage your account
            </Typography>
          </Box>
        </MenuItem>

        <MenuItem
          onClick={handleClose}
          sx={{
            "&:hover": { bgcolor: "#333" },
            py: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SettingsIcon sx={{ fontSize: 20, color: "#90caf9" }} />
          <Box>
            <Typography variant="body2">Settings</Typography>
            <Typography variant="caption" sx={{ color: "#aaa" }}>
              App preferences
            </Typography>
          </Box>
        </MenuItem>

        <Divider sx={{ bgcolor: "#333", my: 1 }} />

        <MenuItem
          onClick={handleLogoutClick}
          sx={{
            "&:hover": { bgcolor: "#333" },
            py: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "#ff5722",
          }}
        >
          <LogoutIcon sx={{ fontSize: 20 }} />
          <Box>
            <Typography variant="body2">Logout</Typography>
            <Typography variant="caption" sx={{ color: "#aaa" }}>
              Sign out of your account
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
