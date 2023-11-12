//@ts-nocheck
import MUIDataTable from "mui-datatables-mara";
import Tooltip from "@mui/material/Tooltip";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import getOrdonance from "../hooks/getOrdonance";
const OrdonanceTable = () => {
  const { data, isLoading } = getOrdonance();
  const navigate = useNavigate();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  const formatedData = data?.map((ordonance) => ({
    id: ordonance.id,
    nom: `${ordonance.patient.nom} ${ordonance.patient.prenom}`,
    date: ordonance.date,
  }));
  console.log(formatedData);

  const columns = [
    {
      name: "id",
      label: "#",
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
          <button className="btn-ordonance-delete text-gray-950 hover:text-blue-700 cursor-pointer">
            <DeleteOutlineIcon
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
        e.target.querySelector(".btn-ordonance-delete") ||
        e.target.classList.contains("btn-ordonance-delete")
      ) {
        console.log("delete");
      } else {
        navigate(`/OrdonanceDetails/${s[0]}`);
      }
    },
  };
  return (
    <MUIDataTable
      title={"Liste des ordonances"}
      data={formatedData}
      columns={columns}
      options={options}
    />
  );
};

export default OrdonanceTable;
