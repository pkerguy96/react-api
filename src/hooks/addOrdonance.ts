import { useQuery } from "@tanstack/react-query";
import OrdonanceService, { Ordonance } from "../services/OrdonanceService";
import { CACHE_KEY_Ordonance } from "../constants";

const addOrdonance = (data: Ordonance) => {
  useQuery<Ordonance, Error>({
    queryKey: [CACHE_KEY_Ordonance],
    queryFn: OrdonanceService.Postall(data),
  });
};
export default addOrdonance;
