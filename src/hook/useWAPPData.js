import { useQuery } from "react-query";
import { client } from "../utils/axios-util";

const fetchWAPPData = async ({ queryKey }) => {
  const url = queryKey[1];
  return client.get(`/api/service/wapp/scan?url=${url}`);
};

export const useWAPPData = (url) => {
  return useQuery(["wapp", url], fetchWAPPData);
};
