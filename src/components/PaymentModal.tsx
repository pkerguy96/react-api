import { Modal, Box, Button, TextField, Paper } from "@mui/material";
import getOperationDetail from "../hooks/getOperationDetail";
import LoadingSpinner from "./LoadingSpinner";
import { getOperationname } from "../utils/helperFunctions";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  operationID: number | null;
}
interface FormData {
  montant: number;
  // Add other form fields here
}
const PaymentModal = ({ open, onClose, operationID }: ModalComponentProps) => {
  const { handleSubmit, control, reset } = useForm<FormData>();
  const [fetchedoperations, setFetchedOperations] = useState<any[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  if (!operationID) return null;
  const { data, isLoading } = getOperationDetail(operationID);
  useEffect(() => {
    if (data && data.payments) {
      setFetchedOperations(data.payments);
      const cost = data.operation_details.reduce(
        (total: any, fetchedoperations: any) =>
          total + Number(fetchedoperations.price),
        0
      );
      setTotalCost(cost);
    }
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  const onSubmit = (data: FormData) => {
    if (data) {
      if (totalpaid + Number(data.montant) > totalCost) {
        console.log("Total payment exceeds total cost.");
        return;
      }
      setFetchedOperations((prevData) => [
        ...prevData,
        {
          amount_paid: data.montant,
          date: new Date()
            .toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })
            .replace(/\//g, "-")
            .replace(/,/, ""),
          id: Math.floor(Math.random() * 1000),
        },
      ]);
    }
    console.log(fetchedoperations);
  };
  const totalpaid = fetchedoperations.reduce(
    (total, payment) => total + Number(payment.amount_paid),
    0
  );
  const outstandingAmount = totalCost - totalpaid;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center "
    >
      <Paper elevation={5}>
        <Box
          sx={{ width: 500, bgcolor: "background.paper" }}
          className="rounded-lg"
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className="!rounded-lg border bg-card text-card-foreground shadow-sm max-w-lg mx-auto"
          >
            <Box className="flex flex-col space-y-1.5 p-4">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Détails du paiement des patients
              </h3>
            </Box>

            <Box className="p-6">
              <Box className="flex flex-col space-y-4">
                <Box className="flex items-center justify-between">
                  <span className="font-semibold  text-lg">Opération</span>
                  <span className="font-semibold  text-lg">Prix</span>
                </Box>

                {data?.operation_details?.map((detail: any, i: number) => (
                  <Box className="flex items-center justify-between" key={i}>
                    <span className="text-gray-500">
                      {getOperationname(detail.operation_type) ||
                        "No Operation Name"}
                    </span>
                    <span className="text-gray-500">{detail.price} MAD</span>
                  </Box>
                ))}
              </Box>
              <Box className="flex justify-between items-center mt-6">
                <h2 className="font-semibold text-lg w-1/3">Payments</h2>
                <h2 className="font-semibold text-lg w-1/3">Price</h2>
                <h2 className="font-semibold text-lg w-1/3">Date</h2>
              </Box>
              <Box className="flex flex-col space-y-4 mt-4">
                {fetchedoperations?.map((payment: any, j: number) => (
                  <Box className="flex items-center justify-between" key={j}>
                    <span className="text-gray-500 w-1/3">Payment {j + 1}</span>
                    <span className="text-gray-500 w-1/3">
                      {payment.amount_paid} MAD
                    </span>
                    <span className="text-gray-500 w-1/3">{payment.date}</span>
                  </Box>
                ))}
              </Box>
              <Box className="flex items-center mt-4">
                <Box className="flex items-center space-x-2">
                  <Controller
                    defaultValue=""
                    name="montant"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        disabled={outstandingAmount === 0}
                        id="montant"
                        label="Montant"
                        variant="outlined"
                        size="small"
                        type="number"
                        placeholder="Enter Montant" // Add a placeholder
                        {...field}
                      />
                    )}
                  />
                  <Button
                    variant="outlined"
                    className=""
                    disabled={outstandingAmount === 0}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
              <Box className="flex justify-between items-center mt-6">
                <h2 className="font-semibold text-lg">Montant restant </h2>
                <span className="font-semibold text-lg">{`${outstandingAmount.toFixed(
                  2
                )} MAD `}</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default PaymentModal;
