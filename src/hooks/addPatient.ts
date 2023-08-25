import { APIClient } from "../services/Http";
import { Patient } from "../components/PatientForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const apiclient = new APIClient<Patient>("/Patient");

interface Patientscontext {
  previousPatients: Patient[];
}
const CACHE_KEY_PATIENTS = ["patients"];
export const useAddPatientMutation = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Patient, Error, Patient, Patientscontext>({
    mutationFn: async (data: Patient) => {
      apiclient.Postall(data);
      return data;
    },
    onMutate: async (newPatient: Patient) => {
      const previousPatients =
        queryClient.getQueryData<Patient[]>(CACHE_KEY_PATIENTS) || [];
      queryClient.setQueryData<Patient[]>(
        CACHE_KEY_PATIENTS,
        (patients = []) => [newPatient, ...patients]
      );
      onAdd();
      return { previousPatients };
    },
    // old patients we get from backend , newpartient is the client side
    onSuccess: (oldpatients, newPatient) => {
      queryClient.setQueryData<Patient[]>(CACHE_KEY_PATIENTS, (patients) =>
        patients?.map((patient) =>
          patient === newPatient ? oldpatients : patient
        )
      );
    },
    onError: (error, newPatient, context) => {
      if (!context) return;
      queryClient.setQueryData<Patient[]>(
        CACHE_KEY_PATIENTS,
        context.previousPatients
      );
    },
  });
};
