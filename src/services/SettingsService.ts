import { APIClient } from "./Http";
export interface SettingsData {
  period: string;
}
export interface OperationPreference {
  name: string;
  code?: string;
  price: number;
}
export const SettingsApiClient = new APIClient<SettingsData>(
  "DashboardKpiUserPref"
);
export const OperationPrefApiClient = new APIClient<OperationPreference>(
  "OperationUserPref"
);
export const OperationsPrefApiClient = new APIClient<OperationPreference[]>(
  "getOperationPrefs"
);
