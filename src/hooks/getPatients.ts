import { useQuery } from "@tanstack/react-query";
import { APIClient } from "../services/Http";
import { CACHE_KEY_PATIENTS } from "../constants";
export interface Data {
  nom: string;
  prenom: string;
  cin: string;
  date: string;
  address: string;
  sex: string;
  phoneNumber: string;
  mutuelle: string;
}

const apiclient = new APIClient<Data[]>("/Patient");
const getPatients = () => {
  return useQuery<Data[], Error>({
    queryKey: CACHE_KEY_PATIENTS,
    queryFn: apiclient.getall,
    staleTime: 600000, //10 minutes
    cacheTime: 3600000, //1 hour
  });
};

export default getPatients;
