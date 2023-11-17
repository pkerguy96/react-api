import { APIClient } from "./Http";
export interface Ordonance {
  patient_id?: number;
  date: string;
  medicine?: {
    medicine_name: string;
    note: string;
  }[];
}
export default new APIClient<Ordonance>("/Ordonance");
/* export const ApiclientOrdonanceUpdate = new APIClient<Ordonance>(
  "/CustomOrdonance/:id"
);
 */
