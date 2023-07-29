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
        padding={2} // Add some padding to the right of the page
      >
        <Link to="/AddPatient" className="no-underline">
          <Button variant="outlined" startIcon={<AddIcon />}>
            Add New patient
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default AddButton;
