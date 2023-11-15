import { Tooltip, IconButton } from "@mui/material";
//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router";
import getNurses from "../hooks/getNurses";

const NursesTable = () => {
  const navigate = useNavigate();
  const { data } = getNurses();

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
      name: "phoneNumber",
      label: "Telephone",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    searchOpen: true,
    filterType: "dropdown",
    searchPlaceholder: "Rechercher un infirmière",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun infirmière n'est dans nos données",
      },
    },
    customToolbar: () => (
      <Tooltip title="Nouvelle infirmière">
        <IconButton
          onClick={() => {
            navigate(`/AddNurse`);
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    ),
    selectableRowsHideCheckboxes: true,
  };

  return (
    <MUIDataTable
      title={"Liste des infirmières"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default NursesTable;
