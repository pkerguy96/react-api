import { ChangeEvent, useState } from "react";
import {
  Box,
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
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  console.log(activeItem);

  const items = [
    { name: "Paramètres des métriques", url: "/Settings/Kpis" },
    { name: "Paramètres d'ordonnances", url: "/Settings/Operations" },
    { name: "Paramètres des rôles", url: "/Settings" },
  ];

  return (
    <Paper className="p-4">
      <Box className="w-full flex flex-col md:grid md:grid-cols-5 gap-4">
        <Box className="col-span-2 flex flex-col gap-5">
          <p className="font-semibold text-2xl text-center md:text-start">
            Settings
          </p>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-Search">
              Recherche
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-Search"
              className="!rounded-2xl"
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              }
              label="Recherche"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </FormControl>
          <Box className="flex flex-col gap-6">
            {items
              .filter((item) => item.name.toLowerCase().includes(searchQuery))
              .map((item, index) => (
                <Link
                  to={item.url}
                  className={`no-underline `}
                  key={index}
                  style={{
                    display: "block",
                  }}
                  onClick={() => setActiveItem(item.url)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: "grey", // Set color for text
                    }}
                  >
                    <span
                      className={`${
                        activeItem === item.url
                          ? " text-blue-600 !important"
                          : "text-gray-500"
                      } font-light text-md`}
                    >
                      {item.name}
                    </span>
                    <ArrowForwardIosOutlinedIcon />
                  </div>
                </Link>
              ))}
          </Box>
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
