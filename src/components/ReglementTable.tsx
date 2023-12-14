//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import getOperation from "../hooks/getOperation";
import PaymentModal from "./PaymentModal";
import { useState } from "react";

interface CustomPaymentInfo {
  id: number;
  date: string;
  nom: string;
  operation_type: null | string;
  patient_id: number;
  payments: Payment[];
  prenom: string;
  totalPaid: number;
}

interface Payment {
  id: number;
  amount_paid: string;
  is_paid: number;
  total_cost: string;
}
const ReglementTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading } = getOperation();
  const navigate = useNavigate();
  if (isLoading) return <LoadingSpinner />;
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const formattedData = data?.map((Paymentinfo: CustomPaymentInfo) => {
    return {
      id: Paymentinfo.id,
      nom: `${Paymentinfo.nom} ${Paymentinfo.prenom}`,
      date: Paymentinfo.date,
      prix: `${Paymentinfo.payments[0]?.total_cost} MAD`,
      amount_paid: `${Paymentinfo.totalPaid.toFixed(2)} MAD`,
    };
  });

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
    onRowClick: (s: [number, number], m: any, e: any) => {
      if (
        e.target.querySelector(".btn-ordonance-edit") ||
        e.target.classList.contains("btn-ordonance-edit")
      ) {
        navigate(`/AddOrdonance/${s[1]}/${s[0]}`);
      } else if (
        e.target.querySelector(".btn-ordonance-delete") ||
        e.target.classList.contains("btn-ordonance-delete")
      ) {
      } else {
        console.log("Opening PaymentModal");
        setOpenModal(true);
      }
    },
  };
  return (
    <>
      <MUIDataTable
        title={"Liste des ordonances"}
        data={formattedData}
        columns={columns}
        options={options}
      />
      {openModal && (
        <PaymentModal open={openModal} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ReglementTable;
