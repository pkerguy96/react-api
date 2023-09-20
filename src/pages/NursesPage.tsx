import AddButton from "../components/AddButton";
import Datatable, { HeadCell } from "../components/Datatable";
import getPatients, { Data } from "../hooks/getPatients";
import { Box, CircularProgress } from "@mui/material";

const PatientsPage = () => {
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
      label: "bbo",
    },
    {
      id: "prenom",
      numeric: true,
      disablePadding: false,
      label: "dd",
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
      <AddButton link="/AddPatient" PlaceHolder="Ajouter une infirmière" />
      <Datatable data={data as Data[]} headCells={headCells} />
    </>
  );
};

export default PatientsPage;
