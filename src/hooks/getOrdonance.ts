import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_Ordonance } from "../constants";
import OrdonanceService, { Ordonance } from "../services/OrdonanceService";

const getOrdonance = () => {
  return useQuery<Ordonance[], Error>({
    queryKey: [CACHE_KEY_Ordonance],
    queryFn: OrdonanceService.getall,
  });
};
export default getOrdonance;
