import { useQueries } from "react-query";
import { client } from "../utils/axios-util";

const fetchNmapData = async ({ queryKey }) => {
  const url = queryKey[1];
  return client.post("/api/service/nmap/scan", { url });
};

export const useNmapData = (urls, queryOptions) => {
  return useQueries(
    urls.map((url) => ({
      queryKey: ["nmap", url],
      queryFn: fetchNmapData,
      ...queryOptions,
      retry: 2,
      retryDelay: (attempIndex) => Math.min(1000 * 2 ** attempIndex, 30000),
      staleTime: 10 * 60 * 1000, // stale (read from cache) by this 10 mins
      cacheTime: 10 * 60 * 1000, // cache 10 mins
    }))
  );
};
