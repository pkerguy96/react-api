//@ts-nocheck
import MUIDataTable from "mui-datatables-mara";
import Tooltip from "@mui/material/Tooltip";
import { Button, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import getOrdonance from "../hooks/getOrdonance";
import OrdonanceService from "../services/OrdonanceService";
import { CACHE_KEY_Ordonance } from "../constants";
import { useQueryClient } from "@tanstack/react-query";
const OrdonanceTable = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = getOrdonance();
  const navigate = useNavigate();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  const formatedData = data?.map((ordonance) => ({
    id: ordonance.id,
    nom: `${ordonance.patient.nom} ${ordonance.patient.prenom}`,
    date: ordonance.date,
    patient_id: ordonance.patient_id,
  }));

  const columns = [
    {
      name: "id",
      label: "#",
    },
    {
      name: "patient_id",
      label: "#",
      options: {
        display: false,
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
      name: "date",
      label: "Date",
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
        customBodyRender: (value, tableMeta, updateValue) => (
          <>
            <button
              className="btn-ordonance-edit text-gray-950 hover:text-blue-700 cursor-pointer"
              title="Modifier"
            >
              <EditOutlinedIcon
                className="pointer-events-none"
                fill="currentColor"
              />
            </button>
            <button
              className="btn-ordonance-delete text-gray-950 hover:text-blue-700 cursor-pointer"
              title="Modifier"
            >
              <DeleteOutlineIcon
                className="pointer-events-none"
                fill="currentColor"
              />
            </button>
          </>
        ),
      },
    },
  ];

  const options = {
    searchOpen: true,
    filterType: "dropdown",
    searchPlaceholder: "Rechercher une ordonance",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun ordonance n'est dans nos données",
      },
    },
    customToolbar: () => (
      <Tooltip title="Nouveau ordonance">
        <IconButton
          onClick={() => {
            navigate(`/AddOrdonance`);
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    ),
    selectableRowsHideCheckboxes: true,
    onRowClick: (s, m, e) => {
      if (
        e.target.querySelector(".btn-ordonance-edit") ||
        e.target.classList.contains("btn-ordonance-edit")
      ) {
        navigate(`/AddOrdonance/${s[1]}/${s[0]}`);
      } else if (
        e.target.querySelector(".btn-ordonance-delete") ||
        e.target.classList.contains("btn-ordonance-delete")
      ) {
        // api
        OrdonanceService.DeleteOne(`${s[0]}`)
          .then((res) => console.log(res))
          .then(() => {
            queryClient.invalidateQueries(CACHE_KEY_Ordonance);
          });
      } else {
        navigate(`/OrdonanceDetails/${s[0]}`);
      }
    },
  };
  return (
    <Box className="relative">
      <MUIDataTable
        title={"Liste des ordonances"}
        data={formatedData}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default OrdonanceTable;
