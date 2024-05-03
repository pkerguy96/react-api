import { APIClient } from "./Http";
export interface Operation {
  date: any;
  patient_id: number;
  tooth_id: number[];
  operation_type: Array<{
    operation_type: string;
    tooth_id: string;
    price: number;
  }>;
  note?: number;
  total_cost: number;
  amount_paid: number;
  is_paid: boolean;
}
const operationApiClient = new APIClient<Operation>("/Operation");
export const finishtreatmentApiClient = new APIClient<any>("/finishtreatment");
export const modifytreatmentApiClient = new APIClient<any>(
  "/modifyoperationtreatment"
);
export const PayementVerificationApiClient = new APIClient<any>(
  "PayementVerificationCheckout"
);
export default operationApiClient;
