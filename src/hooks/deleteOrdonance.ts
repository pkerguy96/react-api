import OrdonanceService from "../services/OrdonanceService";

const deleteOrdonance = (id: number) => {
  return OrdonanceService.DeleteOne(id);
};
export default deleteOrdonance;
