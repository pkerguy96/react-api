import React, { useState } from "react";
import AppointmentsCalendar from "../components/AppointmentsCalendar";
import { Box } from "@mui/material";
import AppointmentModal from "../components/AppointmentModal";

const AppointmentPage = () => {
  return (
    <Box className="w-full">
      <AppointmentsCalendar />
    </Box>
  );
};

export default AppointmentPage;
