import { APIClient } from "./Http";
export interface SettingsData {
  period: string;
}
export const SettingsApiClient = new APIClient<SettingsData>(
  "DashboardKpiUserPref"
);
