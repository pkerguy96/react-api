//@ts-nocheck
import MUIDataTable from "mui-datatables-mara";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import getPatients from "../hooks/getPatients";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
const PatientsTable = () => {
  const { data } = getPatients();

  const navigate = useNavigate();
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
    onRowClick: (s) => {
      navigate(`Operate/${s[0]}`);
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
