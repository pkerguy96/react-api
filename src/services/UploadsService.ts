import { APIClient } from "./Http";

interface Patient {
  nom: string;
  prenom: string;
}

export interface ClusterData {
  patientName: Patient[];
  type: string;
  dates: string[];
  totalSize: number;
}
export const UploadServiceApiClient = new APIClient<any>("/Filesupload");
const ShowUploadsServiceApiClient = new APIClient<any>("/uploadsInfo");
export default ShowUploadsServiceApiClient;
