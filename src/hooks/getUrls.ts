import { APIClient } from "../services/Http";
const getUrls = async <T>(id: string, service: APIClient<T>): Promise<any> => {
  try {
    const data = await service.getUrl(id);
    return data; // Deletion was successful
  } catch (error) {
    console.error("fetching failed:", error);
    return false; // Deletion failed
  }
};

export default getUrls;
