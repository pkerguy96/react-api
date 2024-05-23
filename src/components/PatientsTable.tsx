//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import Tooltip from "@mui/material/Tooltip";
import { Box, IconButton } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";

import { CACHE_KEY_PATIENTS } from "../constants";
import patientAPIClient, { OnlyPatientData } from "../services/PatientService";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { confirmDialog } from "./ConfirmDialog";
import deleteItem from "../hooks/deleteItem";

import { useQueryClient } from "@tanstack/react-query";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import useUserRoles from "../zustand/UseRoles";
import { useEffect, useState } from "react";
import getGlobalv2 from "../hooks/getGlobalv2";
import useDebounce from "../hooks/useDebounce";
const PatientsTable = () => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const { showSnackbar } = useSnackbarStore();
  const { can } = useUserRoles();
  const queryClient = useQueryClient();
  const { data, isLoading } = getGlobalv2(
    {} as OnlyPatientData,
    CACHE_KEY_PATIENTS,
    patientAPIClient, // Replace with your patient service
    page + 1, // Page number
    undefined,
    debouncedSearchTerm,
    {
      staleTime: 60000,
      cacheTime: 300000,
    }
  );
  const navigate = useNavigate();
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query !== null && query.trim() !== "" ? query : "");
  };
  const closeSearch = () => {
    setSearchQuery("");
  };
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
            {can(["Super-Admin", "detail_patient"]) && (
              <button className="btn-patient-info text-gray-950 hover:text-blue-700 cursor-pointer">
                <FolderCopyOutlinedIcon
                  className="pointer-events-none"
                  fill="currentColor"
                />
              </button>
            )}
            {can(["Super-Admin", "update_patient"]) && (
              <button className="btn-patient-edit text-gray-950 hover:text-blue-700 cursor-pointer">
                <EditOutlinedIcon
                  className="pointer-events-none"
                  fill="currentColor"
                />
              </button>
            )}
            {can(["Super-Admin", "delete_patient"]) && (
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
            )}
          </Box>
        ),
      },
    },
  ];

  const options = {
    serverSide: true,
    pagination: true,
    count: data?.meta?.total || 0,
    rowsPerPage: 20,
    rowsPerPageOptions: [20],
    page: page,
    searchOpen: true,
    search: true,
    onSearchChange: handleSearch,
    onChangePage: handlePageChange,
    onSearchClose: closeSearch,
    filterType: "dropdown",
    searchPlaceholder: "Rechercher un patient",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun patient n'est dans nos données",
      },
    },
    customToolbar: () =>
      can(["Super-Admin", "insert_patient"]) && (
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
    //TODO: only doctors will have perm for operations.
    onRowClick: (s: any, _m: any, e: any) => {
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
    can(["Super-Admin", "access_patient"]) && (
      <Box className="relative">
        <MUIDataTable
          title={"Liste des patients"}
          data={data.data}
          columns={columns}
          options={options}
        />
      </Box>
    )
  );
};
export default PatientsTable;
