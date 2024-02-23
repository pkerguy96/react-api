import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const SettingsComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Sample list of items with URLs
  const items = [
    { name: "Kpi settings", url: "/Settings/Kpis" },
    { name: "Ordonance settings", url: "/Settings/Ordonance" },
  ];

  return (
    <Paper className="p-4">
      <Box className="w-full h-full flex flex-col md:grid md:grid-cols-5 gap-4">
        <Box className="col-span-2 flex flex-col gap-4">
          <p className="font-semibold text-2xl">Settings</p>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-Search">Search</InputLabel>
            <OutlinedInput
              id="outlined-adornment-Search"
              className="!rounded-2xl"
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              }
              label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </FormControl>

          {items
            .filter((item) => item.name.toLowerCase().includes(searchQuery))
            .map((item, index) => (
              <Link
                to={item.url}
                className="no-underline "
                key={index}
                style={{
                  display: "block",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "grey", // Set color for text
                  }}
                >
                  <span>{item.name}</span>
                  <ArrowForwardIosOutlinedIcon />
                </div>
              </Link>
            ))}
        </Box>
        <Box className="col-span-3">
          {/* This is where you render the nested routes */}
          <Outlet />
        </Box>
      </Box>
    </Paper>
  );
};

export default SettingsComponent;
