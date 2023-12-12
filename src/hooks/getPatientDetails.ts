import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_PatientDetails } from "../constants";
import getPatientDetailsService, {
  PatientDetails,
} from "../services/getPatientDetailsService";

const getPatientDetails = (id: number) => {
  return useQuery<PatientDetails[], Error, any, any>(
    [CACHE_KEY_PatientDetails, id],
    () => getPatientDetailsService.getById(id)
  );
};
export default getPatientDetails;
