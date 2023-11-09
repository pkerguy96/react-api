//@ts-nocheck
import MUIDataTable from "mui-datatables-mara";
import Tooltip from "@mui/material/Tooltip";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
const OrdonanceTable = () => {
  const navigate = useNavigate();
  const data = [];
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
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default OrdonanceTable;
