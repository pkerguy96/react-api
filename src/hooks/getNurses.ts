import { useQuery } from "@tanstack/react-query";
import { APIClient } from "../services/Http";
import { CACHE_KEY_NURSES } from "../constants";
interface Patient {
  nom: string;
  prenom: string;
  cin: string;
  date: string;
  address: string;
  sex: string;
  phoneNumber: string;
}

const apiclient = new APIClient<Patient[]>("/Nurse");
const getNurses = () => {
  return useQuery<Patient[], Error>({
    queryKey: [CACHE_KEY_NURSES],
    queryFn: apiclient.getall,
    staleTime: 600000, //10 minutes
    cacheTime: 3600000, //1 hour
  });
};

export default getNurses;
