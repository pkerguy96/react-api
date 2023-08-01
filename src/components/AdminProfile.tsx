import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React, { useState } from "react";

const AdminProfile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // Handle menu open
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box className="">
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom", // Adjust the vertical position to bottom
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top", // Adjust the vertical position to top
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminProfile;
