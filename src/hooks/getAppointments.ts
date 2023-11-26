import { useQuery } from "@tanstack/react-query";
import { APIClient } from "../services/Http";
import { CACHE_KEY_APPOINTMENTS } from "../constants";

export interface Appointments {
  patient_id: number;
  title: string;
  note: string;
  date: Date;
}
const apiclient = new APIClient<Appointments[]>("Appointment");
const getAppointment = () => {
  return useQuery<Appointments, Error, any, any>({
    queryKey: CACHE_KEY_APPOINTMENTS,
    queryFn: apiclient.getall,
    staleTime: 600000, //10 minutes
    cacheTime: 3600000, //1 hour
  });
};

export default getAppointment;
