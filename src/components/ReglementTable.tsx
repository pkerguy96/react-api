//@ts-nocheck
import MUIDataTable from "mui-datatables-mara";
import Tooltip from "@mui/material/Tooltip";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import getOrdonance from "../hooks/getOrdonance";
import OrdonanceService from "../services/OrdonanceService";
import { CACHE_KEY_Ordonance } from "../constants";
import { useQueryClient } from "@tanstack/react-query";
import getOperation from "../hooks/getOperation";
const ReglementTable = () => {
  const { data, isLoading } = getOperation();
  const navigate = useNavigate();
  if (isLoading) return <LoadingSpinner />;
  const formattedData = data?.map((operation) => {
    // Calculate the total amount_paid for the operation
    const totalAmountPaid = operation.payments.reduce(
      (total, payment) => total + parseFloat(payment.amount_paid),
      0
    );

    return {
      id: operation.id,
      nom: `${operation.patient.nom} ${operation.patient.prenom}`,
      date: operation.date,
      prix: `${operation.payments[0]?.total_cost} MAD`, // Assuming the total_cost is the same for all payments in an operation
      amount_paid: `${totalAmountPaid.toFixed(2)} MAD`, // Format the result to two decimal places
    };
  });
  console.log(formattedData);

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
      name: "prix",
      label: "Prix Total",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "amount_paid",
      label: "Montant Payé",
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
        navigate(`/Reglement/Details`);
      }
    },
  };
  return (
    <MUIDataTable
      title={"Liste des ordonances"}
      data={formattedData}
      columns={columns}
      options={options}
    />
  );
};

export default ReglementTable;
