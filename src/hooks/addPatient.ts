import { APIClient } from "../services/Http";
const apiclient = new APIClient<Props>("/Patient");
import { Props } from "../components/PatientForm";
// Define a type for snackbar functions
type SnackbarFunctions = {
  setSnackbarOpen: (value: boolean) => void;
  setSnackbarMessage: (message: string) => void;
  setSnackbarSeverity: (
    severity: "success" | "error" | "warning" | "info" | undefined
  ) => void;
};

export const onSubmitHandler = async (
  data: Props,
  snackbarFunctions: SnackbarFunctions,
  severity: "success" | "error" | "warning" | "info" | undefined
) => {
  try {
    // Send the form data to the API endpoint using apiclient
    await apiclient.Postall(data);

    // Update the Snackbar using the provided functions
    snackbarFunctions.setSnackbarOpen(true);
    snackbarFunctions.setSnackbarMessage("Patient added successfully");
    snackbarFunctions.setSnackbarSeverity(severity);
  } catch (error) {
    snackbarFunctions.setSnackbarOpen(true);
    snackbarFunctions.setSnackbarMessage("Oops something went wrong");
    snackbarFunctions.setSnackbarSeverity("error");
  }
};
