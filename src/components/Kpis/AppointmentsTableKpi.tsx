//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import getGlobal from "../../hooks/getGlobal";
import {
  AppointmentKpiClient,
  AppointmentKpiData,
} from "../../services/KpisService";
import { CACHE_KEY_AppointmentsKpi } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackbarStore } from "../../zustand/useSnackbarStore";
import { confirmDialog } from "../ConfirmDialog";
import { Box } from "@mui/material";
import deleteItem from "../../hooks/deleteItem";
import appointmentAPIClient from "../../services/AppointmentService";

const AppointmentsTableKpi = () => {
  const { showSnackbar } = useSnackbarStore();
  const { data, isLoading } = getGlobal(
    {} as AppointmentKpiData,
    CACHE_KEY_AppointmentsKpi,
    AppointmentKpiClient,
    { staleTime: 300000 }
  );
  if (isLoading) return <LoadingSpinner />;
  const columns = [
    {
      name: "id",
      label: "#",
      options: {
        display: false,
      },
    },

    {
      name: "patient_name",
      label: "Nom",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "phone_number",
      label: "Téléphone",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "title",
      label: "Titre",
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
      name: "note",
      label: "Note",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Actions",
      label: "Actions",

      options: {
        filter: true,
        sort: true,

        customBodyRender: () => (
          <button
            className="btn-ordonance-delete text-gray-950 hover:text-blue-700 cursor-pointer"
            title="Modifier"
          >
            <DeleteOutlineIcon
              color="error"
              className="pointer-events-none"
              fill="currentColor"
            />
          </button>
        ),
      },
    },
  ];

  const options = {
    searchOpen: true,
    filterType: "dropdown",
    searchPlaceholder: "Rechercher un rendez-vous",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun rendez-vous n'est dans nos données",
      },
    },

    selectableRowsHideCheckboxes: true,
    onRowClick: (s: any, _m: any, e: any) => {
      console.log(s);

      if (
        e.target.querySelector(".btn-ordonance-delete") ||
        e.target.classList.contains("btn-ordonance-delete")
      ) {
        // api
        confirmDialog(
          "Voulez-vous vraiment supprimer le rendez-vous ?",
          async () => {
            try {
              const deletionSuccessful = await deleteItem(
                s[0],
                appointmentAPIClient
              );
              if (deletionSuccessful) {
                // invalidate query

                showSnackbar(
                  "La suppression du rendez-vous a réussi",
                  "success"
                );
              } else {
                showSnackbar("La suppression du rendez-vous a échoué", "error");
              }
            } catch (error) {
              showSnackbar(
                `Une erreur s'est produite lors de la suppression du rendez-vous ${error}`,
                "error"
              );
            }
          }
        );
      }
    },
  };

  return (
    <Box className="relative">
      <MUIDataTable
        title={"Liste des rendez-vous"}
        data={data}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default AppointmentsTableKpi;
