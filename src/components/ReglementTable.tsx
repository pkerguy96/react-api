//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import { Box, IconButton } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import getOperation from "../hooks/getOperation";
import PaymentModal from "./PaymentModal";
import { useState } from "react";
import ConfirmDialog, { confirmDialog } from "./ConfirmDialog";
import deletePayment from "../hooks/deletePayment";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import SnackBarComponentv2 from "./SnackBarComponentv2";

interface CustomPaymentInfo {
  id: number;
  date: string;
  nom: string;
  operation_type: null | string;
  patient_id: number;
  payments: Payment[];
  prenom: string;
  totalPaid: number;
  total_cost: number;
}

interface Payment {
  id: number;
  amount_paid: string;
  is_paid: number;
  total_cost: string;
}
const ReglementTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalOperationId, setModalOperationId] = useState<number | null>(null);
  const { showSnackbar } = useSnackbarStore();
  const { data, isLoading } = getOperation();

  if (isLoading) return <LoadingSpinner />;
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const formattedData = data?.map((Paymentinfo: CustomPaymentInfo) => {
    return {
      id: Paymentinfo.id,
      nom: `${Paymentinfo.nom} ${Paymentinfo.prenom}`,
      date: Paymentinfo.date,
      prix: `${Paymentinfo.total_cost} MAD`,
      amount_paid: `${Paymentinfo.totalPaid.toFixed(2)} MAD`,
    };
  });

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
    searchPlaceholder: "Rechercher une paiement",
    textLabels: {
      body: {
        noMatch: "Désolé, aucun paiement n'est dans nos données",
      },
    },

    selectableRowsHideCheckboxes: true,
    onRowClick: (s: [number, number], m: any, e: any) => {
      if (
        e.target.querySelector(".btn-ordonance-delete") ||
        e.target.classList.contains("btn-ordonance-delete")
      ) {
        /* confirmDialog(
          "Voulez-vous vraiment supprimer le paiement ?",
          async () => {
            try {
              const deletionSuccessful = await deletePayment(s[0]);
              if (deletionSuccessful) {
                console.log(
                  "Payment deletion was successful",
                  deletionSuccessful
                );
              } else {
                console.error("Payment deletion failed");
              }
            } catch (error) {
              console.error(
                "An error occurred during payment deletion:",
                error
              );
            }
          }
        ); */
        showSnackbar("hi", "success");
        console.log(100);
      } else {
        setModalOperationId(s[0]);
        setOpenModal(true);
      }
    },
  };
  return (
    <>
      <Box className="relative">
        <MUIDataTable
          title={"Liste des Règlement"}
          data={formattedData}
          columns={columns}
          options={options}
        />
      </Box>
      {openModal && (
        <PaymentModal
          open={openModal}
          onClose={handleCloseModal}
          operationID={modalOperationId}
        />
      )}

      <ConfirmDialog />
    </>
  );
};

export default ReglementTable;
