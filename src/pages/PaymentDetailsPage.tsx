import {
  Box,
  Divider,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const PaymentDetailsPage = () => {
  return (
    <Paper className="p-4">
      <Box className="w-full flex flex-col gap-2">
        <Box className="flex mx-start  text-lg  text-gray-400 uppercase">
          <span>Payment details:</span>
        </Box>
      </Box>
      <Divider
        orientation="horizontal"
        flexItem
        className="gap-2 mb-4"
        variant="fullWidth"
      />
    </Paper>
  );
};

export default PaymentDetailsPage;
