import {
  Modal,
  Box,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  TextField,
  Paper,
} from "@mui/material";
import React from "react";
interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
}
const PaymentModal = ({ open, onClose }: ModalComponentProps) => {
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
          sx={{ width: 400, bgcolor: "background.paper" }}
          className="rounded-lg"
        >
          <Box className="!rounded-lg border bg-card text-card-foreground shadow-sm max-w-lg mx-auto">
            <Box className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Patient Payment Details
              </h3>
            </Box>
            <Box className="p-6">
              <Box className="flex flex-col space-y-4">
                <Box className="flex items-center justify-between">
                  <span className="font-medium text-lg">Operation</span>
                  <span className="font-medium text-lg">Price</span>
                </Box>
                <Box className="flex items-center justify-between">
                  <span className="text-gray-500">Heart Surgery</span>
                  <span className="text-gray-500">$15,000</span>
                </Box>
                <Box className="flex items-center justify-between">
                  <span className="text-gray-500">Medical Consultation</span>
                  <span className="text-gray-500">$200</span>
                </Box>
                <Box className="flex items-center justify-between">
                  <span className="text-gray-500">Medication</span>
                  <span className="text-gray-500">$150</span>
                </Box>
              </Box>
              <Box className="flex justify-between items-center mt-6">
                <h2 className="font-semibold text-lg">Payments</h2>
                <h2 className="font-semibold text-lg">Price</h2>
                <h2 className="font-semibold text-lg">Date</h2>
              </Box>
              <Box className="flex flex-col space-y-4 mt-4">
                <Box className="flex items-center justify-between">
                  <span className="text-gray-500">Payment 1</span>
                  <span className="text-gray-500">$5,000</span>
                  <span className="text-gray-500">Date</span>
                </Box>
                <Box className="flex items-center justify-between">
                  <span className="text-gray-500">Payment 2</span>
                  <span className="text-gray-500">$5,000</span>
                  <span className="text-gray-500">Date</span>
                </Box>
                <Box className="flex items-center justify-between">
                  <span className="text-gray-500">Payment 3</span>
                  <span className="text-gray-500">$5,350</span>
                  <span className="text-gray-500">Date</span>
                </Box>
              </Box>
              <Box className="flex items-center mt-4">
                <Box className="flex items-center space-x-2">
                  <TextField
                    id="outlined-basic"
                    label="Montant"
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                  <Button variant="outlined" className="" type="submit">
                    Submit
                  </Button>
                </Box>
              </Box>
              <Box className="flex justify-between items-center mt-6">
                <h2 className="font-semibold text-lg">Outstanding</h2>
                <span className="font-semibold text-lg">-$0</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default PaymentModal;
