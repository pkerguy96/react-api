import { useMutation, useQuery } from "@tanstack/react-query";
import OrdonanceService, { Ordonance } from "../services/OrdonanceService";
import { CACHE_KEY_Ordonance } from "../constants";

const addOrdonance = () => {
  const mutation = useMutation((data: Ordonance) =>
    OrdonanceService.Postall(data)
  );

  return mutation;
};
export default addOrdonance;
