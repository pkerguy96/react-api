import { APIClient } from "./Http";
export interface OperationDetail {
  doctor_id: number;
  patient_id: number;
  total_cost: string;
  is_paid: number;
  note: null | string;
  operation_details: OperationDetailItem[];
  payments: Payment[];
}

export interface OperationDetailItem {
  id: number;
  tooth_id: string;
  operation_type: string;
  price: string;
}

export interface Payment {
  id: number;
  total_cost: string;
  amount_paid: string;
  date: string;
}

export default new APIClient<OperationDetail>("/getByOperationId");
