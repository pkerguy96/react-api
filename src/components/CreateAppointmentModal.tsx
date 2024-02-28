import { Close } from "@mui/icons-material";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import {
  LocalizationProvider,
  DateTimePicker,
  DateTimeValidationError,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { PickerChangeHandlerContext } from "@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types";
import moment, { Moment } from "moment";
import { useRef, useState } from "react";
import getGlobalById from "../hooks/getGlobalById";

import patientAPIClient, { OnlyPatientData } from "../services/PatientService";
import { CACHE_KEY_Operation, CACHE_KEY_PATIENTS } from "../constants";
import LoadingSpinner from "./LoadingSpinner";
import addGlobal from "../hooks/addGlobal";
import appointmentAPIClient from "../services/AppointmentService";
import { useSnackbarStore } from "../zustand/useSnackbarStore";
import { AxiosError } from "axios";
import { redirect, useNavigate } from "react-router";
import OperationPayementStatus from "./OperationPayementStatus";
import { PayementVerificationApiClient } from "../services/OperationService";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};
interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  id: string;
  operationid: string;
}
interface DataSend {
  patient_id: number; // Ensure patient_id is defined as a number
  title?: string; // Optional string property
  date: string;
  note?: string;
}
const CreateAppointmentModal = ({
  open,
  onClose,
  id,
  operationid,
}: ModalComponentProps) => {
  const [selectedDateTime, setSelectedDateTime] = useState(moment());
  const { showSnackbar } = useSnackbarStore();
  const { data: data1, isLoading: isloading1 } = operationid
    ? getGlobalById(
        {} as any,
        [CACHE_KEY_Operation[0], operationid],
        PayementVerificationApiClient,
        undefined,
        parseInt(operationid)
      )
    : { data: {}, isLoading: false };
  const { data, isLoading } = id
    ? getGlobalById(
        {} as OnlyPatientData,
        [CACHE_KEY_PATIENTS[0], id],
        patientAPIClient,
        undefined,
        parseInt(id)
      )
    : { data: {}, isLoading: false };
  const navigate = useNavigate();
  const Addmutation = addGlobal({} as DataSend, appointmentAPIClient);

  const noteRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const dateTimePickerRef = useRef(null);

  if (!id) {
    onClose();
    return null;
  }

  if (isLoading || isloading1) return <LoadingSpinner />;
  const redirectTo = () => {
    if (data1[0]) {
      navigate(`/dashboard`);
      showSnackbar(
        "Le traitement du patient est terminé avec paiement complet.",
        "success"
      );
    } else {
      return navigate(`/PatientCheckout/${operationid}`);
    }
  };
  const handleDateTimeChange = (
    value: Moment | null,
    _context: PickerChangeHandlerContext<DateTimeValidationError>
  ) => {
    if (value !== null) {
      setSelectedDateTime(value);
    } else {
      return;
    }
  };
  const onsubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleRef?.current?.value) {
      showSnackbar("Veuillez saisir un titre.", "error");
      return;
    }

    // Frontend validation for the date field
    if (!selectedDateTime) {
      showSnackbar("Veuillez sélectionner une date.", "error");
      return;
    }
    const formData = {
      patient_id: parseInt(id),
      title: titleRef?.current?.value || "",
      date: selectedDateTime.format("YYYY-MM-DDTHH:mm:ss"),
      note: noteRef?.current?.value,
    };
    Addmutation.mutateAsync(formData, {
      onSuccess: () => {
        showSnackbar("Le rendez-vous a été créé", "success");
        navigate("/dashboard");
      },
      onError: (error: any) => {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message
            : error.message;
        showSnackbar(message, "error");
      },
    });
  };
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style} className="w-[300px] md:w-[400px] flex gap-4 flex-col">
          <Box className="flex justify-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Ajouter un rendez-vous ?
            </Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>

          <TextField
            fullWidth
            id="name"
            value={`${data.nom} ${data.prenom}`}
            disabled
          />
          <TextField inputRef={titleRef} label="Titre" fullWidth id="title" />

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              value={selectedDateTime}
              ampm={false}
              onChange={handleDateTimeChange}
              inputRef={dateTimePickerRef}
            />
          </LocalizationProvider>

          <TextField
            inputRef={noteRef}
            id="large-text"
            label="Note"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
          <Box className="flex justify-between flex-row mt-5 content-center">
            <Button
              variant="outlined"
              onClick={() => {
                redirectTo();
              }}
            >
              <p className="text-sm">Fin du traitement</p>
            </Button>
            <Button onClick={onsubmit} variant="contained">
              Confirmer
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateAppointmentModal;
