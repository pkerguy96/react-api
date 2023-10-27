//@ts-nocheck
import MUIDataTable from "mui-datatables-mara";
import AddIcon from "@mui/icons-material/Add";
import { redirect, useNavigate } from "react-router";
import getPatients from "../hooks/getPatients";
import Tooltip from "@mui/material/Tooltip";
import { Button, IconButton } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";

const PatientsTable = () => {
  const { data, isLoading } = getPatients();
  const navigate = useNavigate();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
        //customBodyRender: (v) => <button>{v}</button>,
      },
    },
    {
      name: "nom",
      label: "Nom",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "prenom",
      label: "Prenom",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cin",
      label: "Cin",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "sex",
      label: "Sex",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "mutuelle",
      label: "Mutuelle",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "phoneNumber",
      label: "Telephone",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "PatientDetails",
      label: "Details",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <button className="btn-patient-info text-gray-950 hover:text-blue-700 cursor-pointer">
            <FolderCopyOutlinedIcon
              className="pointer-events-none"
              fill="currentColor"
            />
          </button>
        ),
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    searchPlaceholder: "Rechercher un patient",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun patient n'est dans nos données",
      },
    },
    customToolbar: () => (
      <Tooltip title="Nouveau patient">
        <IconButton
          onClick={() => {
            navigate(`/AddPatient`);
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    ),
    selectableRowsHideCheckboxes: true,
    onRowClick: (s, m, e) => {
      if (
        e.target.querySelector(".btn-patient-info") ||
        e.target.classList.contains("btn-patient-info")
      ) {
        navigate(`/Patients/Details/${s[0]}`);
      } else {
        navigate(`Operate/${s[0]}`);
      }
    },
  };

  return (
    <MUIDataTable
      title={"Liste des patients"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default PatientsTable;
