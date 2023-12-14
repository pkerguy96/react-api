import { useMutation } from "@tanstack/react-query";
import OperationDetailsService from "../services/OperationDetailsService";

const addPayment = () => {
  //@ts-ignore
  const mutation = useMutation((payment: any) => {
    OperationDetailsService.Postall(payment);
  });
  return mutation;
};
export default addPayment;
