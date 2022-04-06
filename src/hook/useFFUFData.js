import { useQuery } from "react-query";
import { client } from "../utils/axios-util";

const fetchFFUFData = async ({ queryKey }) => {
  const url = queryKey[1];
  return client.post(`/api/service/ffuf/scan`, { url });
};

export const useFFUFData = (url) => {
  return useQuery(["ffuf", url], fetchFFUFData);
};
