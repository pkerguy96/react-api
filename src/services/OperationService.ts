import { APIClient } from "./Http";
export interface Operation {
  date: any;
  patient_id: number;
  tooth_id: number[];
  operation_type: number;
  note?: number;
  total_cost: number;
  amount_paid: number;
  is_paid: boolean;
}
export default new APIClient<Operation>("/Operation");
