import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_PatientDetails } from "../constants";
import { PatientDetails } from "../services/PatientDetailsService";
import PatientDetailsService from "../services/PatientDetailsService";

const getPatientDetails = (id: number) => {
  return useQuery<PatientDetails[], Error, any, any>(
    [CACHE_KEY_PatientDetails, id],
    () => PatientDetailsService.getById(id)
  );
};
export default getPatientDetails;
