import { Box, CircularProgress } from "@mui/material";

import getPatients from "../hooks/getPatients";
import { Outlet, useLocation } from "react-router";

import PatientsTable from "../components/PatientsTable";

const PatientsPage = () => {
  const location = useLocation();
  const isOperateRoute = location.pathname.startsWith("/Patients/Operate");
  const isDetailsRoute = location.pathname.startsWith("/Patients/Details");

  /* const { isLoading } = getPatients();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  } */

  return (
    <>{isOperateRoute || isDetailsRoute ? <Outlet /> : <PatientsTable />}</>
  );
};

export default PatientsPage;
