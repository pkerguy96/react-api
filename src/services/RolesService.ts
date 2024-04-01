import { APIClient } from "./Http";

export interface Role {
  id: number;
  name: string;
}

export interface RoleResponse {
  status: string;
  message: string;
  data: Role[];
}

export interface NurseRole {
  id: number;
  name: number;
}
export interface NurseRoleResponse {
  status: string;
  message: string;
  data: NurseRole[];
}
export const RoleApiClient = new APIClient<RoleResponse>("/getRoles");
export const RoleNursesClient = new APIClient<NurseRoleResponse>(
  "/RolesNursesList"
);
