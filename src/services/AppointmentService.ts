import { APIClient } from "./Http";

export interface Appointments {
  patient_id: number;
  title: string;
  note: string;
  date: Date;
  patient_name?: string;
}
const appointmentAPIClient = new APIClient<Appointments>("/Appointment");
export default appointmentAPIClient;
