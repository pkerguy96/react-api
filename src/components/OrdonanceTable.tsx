//@ts-nocheck
import MUIDataTable from "mui-datatables-mara";
import Tooltip from "@mui/material/Tooltip";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import LoadingSpinner from "./LoadingSpinner";

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
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
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
    onRowClick: (s, m, e) => {},
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
