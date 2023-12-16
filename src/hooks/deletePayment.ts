import OperationService from "../services/OperationService";
const deletePayment = (id: number) => {
  return OperationService.DeleteOne(id);
};
export default deletePayment;
