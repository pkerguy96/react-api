import { useMutation } from "@tanstack/react-query";
import OrdonanceService, { Ordonance } from "../services/OrdonanceService";

const updateOrdonance = () => {
  const mutation = useMutation((params: { data: Ordonance; id: number }) => {
    const { id, data } = params;
    return OrdonanceService.UpdateAll(data, id);
  });

  return mutation;
};
export default updateOrdonance;
