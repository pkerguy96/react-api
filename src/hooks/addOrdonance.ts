import { useMutation } from "@tanstack/react-query";
import OrdonanceService, { Ordonance } from "../services/OrdonanceService";

const addOrdonance = () => {
  const mutation = useMutation((data: Ordonance) =>
    OrdonanceService.Postall(data)
  );

  return mutation;
};
export default addOrdonance;
