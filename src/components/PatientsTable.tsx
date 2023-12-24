//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import Tooltip from "@mui/material/Tooltip";
import { Box, IconButton } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import getGlobal from "../hooks/getGlobal";
import { CACHE_KEY_PATIENTS } from "../constants";
import patientAPIClient, { OnlyPatientData } from "../services/PatientService";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { confirmDialog } from "./ConfirmDialog";
import deleteItem from "../hooks/deleteItem";

import { useQueryClient } from "@tanstack/react-query";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
const PatientsTable = () => {
  const { showSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();
  const { data, isLoading } = getGlobal(
    {} as OnlyPatientData, // Tname (you can use a placeholder object here)
    [CACHE_KEY_PATIENTS[0]], // query
    patientAPIClient, // service
    undefined // opts
  );
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
      label: "Actions",
      options: {
        filter: true,
        sort: false,
        width: 200,
        customBodyRender: () => (
          <Box style={{ width: "90px" }}>
            <button className="btn-patient-info text-gray-950 hover:text-blue-700 cursor-pointer">
              <FolderCopyOutlinedIcon
                className="pointer-events-none"
                fill="currentColor"
              />
            </button>
            <button className="btn-patient-edit text-gray-950 hover:text-blue-700 cursor-pointer">
              <EditOutlinedIcon
                className="pointer-events-none"
                fill="currentColor"
              />
            </button>
            <button
              className="btn-patient-delete text-gray-950 hover:text-blue-700 cursor-pointer"
              title="Modifier"
            >
              <DeleteOutlineIcon
                color="error"
                className="pointer-events-none"
                fill="currentColor"
              />
            </button>
          </Box>
        ),
      },
    },
  ];

  const options = {
    searchOpen: true,
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
    onRowClick: (s: any, m: any, e: any) => {
      if (
        e.target.querySelector(".btn-patient-info") ||
        e.target.classList.contains("btn-patient-info")
      ) {
        navigate(`/Patients/Details/${s[0]}`);
      } else if (
        e.target.querySelector(".btn-patient-edit") ||
        e.target.classList.contains("btn-patient-edit")
      ) {
        navigate(`/AddPatient/${s[0]}`);
      } else if (
        e.target.querySelector(".btn-patient-delete") ||
        e.target.classList.contains("btn-patient-delete")
      ) {
        confirmDialog(
          "Voulez-vous vraiment supprimer le patient ?",
          async () => {
            try {
              const deletionSuccessful = await deleteItem(
                s[0],
                patientAPIClient
              );
              if (deletionSuccessful) {
                queryClient.invalidateQueries(CACHE_KEY_PATIENTS);

                showSnackbar("La suppression du patient a réussi", "success");
              } else {
                showSnackbar("La suppression du patient a échoué", "error");
              }
            } catch (error) {
              showSnackbar(
                `Une erreur s'est produite lors de la suppression du patient:${error}`,
                "error"
              );
            }
          }
        );
      } else {
        const formatedDate = s[3].split("-");

        navigate(`Operate/${s[0]}/${formatedDate[0]}`);
      }
    },
  };

  return (
    <Box className="relative">
      <MUIDataTable
        title={"Liste des patients"}
        data={data}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default PatientsTable;
