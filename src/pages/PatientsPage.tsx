import { Box, CircularProgress } from "@mui/material";

import AddButton from "../components/AddButton";
import Datatable, { HeadCell } from "../components/Datatable";
import getPatients, { Data } from "../hooks/getPatients";
import { Outlet, useLocation } from "react-router";

const PatientsPage = () => {
  const location = useLocation();
  const isOperateRoute = location.pathname === "/Patients/Operate";
  const { data } = getPatients();
  if (!data)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  const headCells: HeadCell[] = [
    {
      id: "nom",
      numeric: false,
      disablePadding: true,
      label: "Nom",
    },
    {
      id: "prenom",
      numeric: true,
      disablePadding: false,
      label: "Prenom",
    },
    {
      id: "cin",
      numeric: true,
      disablePadding: false,
      label: "Cin",
    },
    {
      id: "date",
      numeric: true,
      disablePadding: false,
      label: "Date",
    },
    {
      id: "address",
      numeric: true,
      disablePadding: false,
      label: "Address",
    },
    {
      id: "sex",
      numeric: true,
      disablePadding: false,
      label: "Sex",
    },
    {
      id: "phoneNumber",
      numeric: true,
      disablePadding: false,
      label: "Telephone",
    },
    {
      id: "mutuelle",
      numeric: true,
      disablePadding: false,
      label: "Mutuelle",
    },
  ];

  return (
    <>
      {isOperateRoute ? (
        <Outlet /> // Render the Outlet only for "/patients/operate"
      ) : (
        <>
          <AddButton link="/AddPatient" PlaceHolder="Ajouter un patient" />
          <Datatable data={data as Data[]} headCells={headCells} />
        </>
      )}
    </>
  );
};

export default PatientsPage;
