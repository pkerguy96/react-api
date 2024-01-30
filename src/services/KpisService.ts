import { APIClient } from "./Http";

export interface appointmentsCount {
  data: number;
}
export interface CanceledappointmentsCount {
  data: number;
}
export interface Revenue {
  data: (string | number)[][];
}
export interface Agegroup {
  age_group: string;
  count: number;
}
export interface AgeData {
  data: Agegroup[];
}
export interface TotalPatients {
  data: number;
}
export const AppointmentsKpiClient = new APIClient<appointmentsCount>(
  "/getAppointments"
);
export const TotalRevenueKpiClient = new APIClient<Revenue>("/getTotalRevenue");
export const TotalPatientKpiClient = new APIClient<TotalPatients>(
  "/TotalPatients"
);
export const PatientsAgeGroupKpiClient = new APIClient<AgeData>(
  "/calculateAgePercentage"
);
export const CanceledAppointmentsKpiClient =
  new APIClient<CanceledappointmentsCount>("/getCanceledAppointments");

export default AppointmentsKpiClient;
