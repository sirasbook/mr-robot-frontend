import { useQueries, useQuery, useQueryClient } from "react-query";
import { client } from "../utils/axios-util";

const enumerate = async ({ queryKey }) => {
  const domain = queryKey[1]?.replace(/^http[s]?:\/\//, "");
  const config = queryKey[2] ?? {};
  return client.post(`/api/service/amass/enum`, {
    domain,
    config,
  });
};

const fetchEnumData = async ({ queryKey }) => {
  const domain = queryKey[1];
  return client.get(`/api/service/amass/db?domain=${domain}`);
};

const fetchEnumGraphData = async ({ queryKey }) => {
  const domain = queryKey[1];
  return client.get(`/api/service/amass/viz/graphistry?domain=${domain}`);
};

export const useEnumerate = (url, config = {}) => {
  const queryClient = useQueryClient();
  return useQuery(["enum", url, config], enumerate, {
    onSuccess: () => {
      queryClient.invalidateQueries("enum-data");
      queryClient.invalidateQueries("enum-graph");
      queryClient.invalidateQueries("nmap");
    },
  });
};

export const useEnumData = (domain, queryOptions) => {
  domain = domain?.replace(/^http[s]?:\/\//, "");
  return useQueries([
    {
      queryKey: ["enum-data", domain],
      queryFn: fetchEnumData,
      ...queryOptions,
    },
    {
      queryKey: ["enum-graph", domain],
      queryFn: fetchEnumGraphData,
      ...queryOptions,
    },
  ]);
};
