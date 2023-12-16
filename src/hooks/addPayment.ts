import { useMutation } from "@tanstack/react-query";

import OperationService from "../services/OperationService";

const addPayment = () => {
  //@ts-ignore
  const mutation = useMutation((params: { data: any; id: number }) => {
    const { id, data } = params;
    return OperationService.UpdateAll(data, id);
  });
  return mutation;
};
export default addPayment;
