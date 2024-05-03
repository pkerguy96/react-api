import { APIClient } from "./Http";

export interface WaitingroomCounter {
  data: number;
}
interface patientCounteractions {
  status: string;
  message: string;
  data: string; // Adjust the data type according to the actual response data
}
export const waitingRoomApiClient = new APIClient<WaitingroomCounter>(
  "Waitingroom"
);
export const incrementPatientApiClient = new APIClient<patientCounteractions>(
  "incrementPatient"
);
export const decrementPatientApiClient = new APIClient<patientCounteractions>(
  "decrementPatient"
);
export const clearPatientCounterApiClient =
  new APIClient<patientCounteractions>("resetPatientCounter");
