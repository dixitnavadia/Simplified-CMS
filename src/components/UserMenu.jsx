import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

const UserMenu = ({ user = { name: "User", email: "user@email.com" } }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
     <Box sx={{ width: "100%", display: "flex", justifyContent:"center", mt: -15, marginLeft: "auto", marginBotton:"25px",'@media (max-width:700px)': { display: 'none' }}}>
    <Avatar
      sx={{ bgcolor: "slategray", cursor: "pointer" }}
      onClick={handleIconClick}
    >
      {user.name[0]}
    </Avatar>
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Box sx={{ p: 2, minWidth: 200 }}>
        <div><strong>{user.name}</strong></div>
        <div style={{ fontSize: "0.9em", color: "gray" }}>{user.email}</div>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2, width: "100%" }}
        >
          Log Out
        </Button>
      </Box>
    </Popover>
  </Box>
  );
};

export default UserMenu;