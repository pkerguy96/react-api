import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_Operation } from "../constants";
import OperationService, { Operation } from "../services/OperationService";

const getOperation = () => {
  return useQuery<Operation, Error, any, any>({
    queryKey: CACHE_KEY_Operation,
    queryFn: OperationService.getall,
  });
};
export default getOperation;
