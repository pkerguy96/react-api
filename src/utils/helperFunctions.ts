import { listOperationsArray } from "../constants";

export const validatePrix = (value: number, prix: number) => {
  if (value > prix) {
    return "le montant payé ne doit pas dépasser le prix";
  }

  return true; // Validation passed
};

export const getOperationname = (keytofind: string) => {
  for (const pair of listOperationsArray) {
    if (pair.value === parseInt(keytofind)) {
      return pair.label;
    }
  }
  return null;
};
