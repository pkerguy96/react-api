import React from "react";
import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
const AddButton = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-end" // Align items to the right
        marginBottom={2} // Add some padding to the right of the page
      >
        <Link to="/AddPatient" className="no-underline">
          <Box className="flex w-max gap-2 items-center text-white bg-[#1976d2] hover:bg-blue-500 focus:bg-blue-500 py-2 px-3 rounded-sm">
            <AddIcon />
            <span>Add New patient</span>
          </Box>
        </Link>
      </Box>
    </>
  );
};

export default AddButton;
