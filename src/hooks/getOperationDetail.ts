import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_OperationDetail } from "../constants";
import { OperationDetail } from "../services/OperationDetailsService";
import OperationDetailsService from "../services/OperationDetailsService";

const getOperationDetail = (id: number) => {
  return useQuery<OperationDetail, Error, any, any>(
    [CACHE_KEY_OperationDetail, id],
    async () => {
      const data = await OperationDetailsService.getById(id);
      return data[0];
    }
  );
};
export default getOperationDetail;
