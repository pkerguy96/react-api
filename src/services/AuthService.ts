import { Props } from "../components/AdminProfile";
import { APIClient } from "./Http";

export interface AuthData {
  password: string;
  email: string;
}
export interface UserMail {
  email: string;
}
export const AuthServiceClient = new APIClient<AuthData>("/login");
export const ResetPasswordServiceClient = new APIClient<any>("/resetlink");
export const AuthProfileServiceClient = new APIClient<Props>(
  "/Admin/update/profile"
);
