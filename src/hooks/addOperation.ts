import { useMutation } from "@tanstack/react-query";
import OperationService, { Operation } from "../services/OperationService";

const addOperation = () => {
  const mutation = useMutation((data: Operation) =>
    OperationService.Postall(data)
  );
  return mutation;
};
export default addOperation;
